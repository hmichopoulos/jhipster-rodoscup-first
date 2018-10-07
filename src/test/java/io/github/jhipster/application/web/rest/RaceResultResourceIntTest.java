package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.RodosCupManagerApp;

import io.github.jhipster.application.domain.RaceResult;
import io.github.jhipster.application.repository.RaceResultRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RaceResultResource REST controller.
 *
 * @see RaceResultResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RodosCupManagerApp.class)
public class RaceResultResourceIntTest {

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    @Autowired
    private RaceResultRepository raceResultRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRaceResultMockMvc;

    private RaceResult raceResult;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RaceResultResource raceResultResource = new RaceResultResource(raceResultRepository);
        this.restRaceResultMockMvc = MockMvcBuilders.standaloneSetup(raceResultResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RaceResult createEntity(EntityManager em) {
        RaceResult raceResult = new RaceResult()
            .url(DEFAULT_URL);
        return raceResult;
    }

    @Before
    public void initTest() {
        raceResult = createEntity(em);
    }

    @Test
    @Transactional
    public void createRaceResult() throws Exception {
        int databaseSizeBeforeCreate = raceResultRepository.findAll().size();

        // Create the RaceResult
        restRaceResultMockMvc.perform(post("/api/race-results")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(raceResult)))
            .andExpect(status().isCreated());

        // Validate the RaceResult in the database
        List<RaceResult> raceResultList = raceResultRepository.findAll();
        assertThat(raceResultList).hasSize(databaseSizeBeforeCreate + 1);
        RaceResult testRaceResult = raceResultList.get(raceResultList.size() - 1);
        assertThat(testRaceResult.getUrl()).isEqualTo(DEFAULT_URL);
    }

    @Test
    @Transactional
    public void createRaceResultWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = raceResultRepository.findAll().size();

        // Create the RaceResult with an existing ID
        raceResult.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRaceResultMockMvc.perform(post("/api/race-results")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(raceResult)))
            .andExpect(status().isBadRequest());

        // Validate the RaceResult in the database
        List<RaceResult> raceResultList = raceResultRepository.findAll();
        assertThat(raceResultList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRaceResults() throws Exception {
        // Initialize the database
        raceResultRepository.saveAndFlush(raceResult);

        // Get all the raceResultList
        restRaceResultMockMvc.perform(get("/api/race-results?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(raceResult.getId().intValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())));
    }
    
    @Test
    @Transactional
    public void getRaceResult() throws Exception {
        // Initialize the database
        raceResultRepository.saveAndFlush(raceResult);

        // Get the raceResult
        restRaceResultMockMvc.perform(get("/api/race-results/{id}", raceResult.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(raceResult.getId().intValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRaceResult() throws Exception {
        // Get the raceResult
        restRaceResultMockMvc.perform(get("/api/race-results/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRaceResult() throws Exception {
        // Initialize the database
        raceResultRepository.saveAndFlush(raceResult);

        int databaseSizeBeforeUpdate = raceResultRepository.findAll().size();

        // Update the raceResult
        RaceResult updatedRaceResult = raceResultRepository.findById(raceResult.getId()).get();
        // Disconnect from session so that the updates on updatedRaceResult are not directly saved in db
        em.detach(updatedRaceResult);
        updatedRaceResult
            .url(UPDATED_URL);

        restRaceResultMockMvc.perform(put("/api/race-results")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRaceResult)))
            .andExpect(status().isOk());

        // Validate the RaceResult in the database
        List<RaceResult> raceResultList = raceResultRepository.findAll();
        assertThat(raceResultList).hasSize(databaseSizeBeforeUpdate);
        RaceResult testRaceResult = raceResultList.get(raceResultList.size() - 1);
        assertThat(testRaceResult.getUrl()).isEqualTo(UPDATED_URL);
    }

    @Test
    @Transactional
    public void updateNonExistingRaceResult() throws Exception {
        int databaseSizeBeforeUpdate = raceResultRepository.findAll().size();

        // Create the RaceResult

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRaceResultMockMvc.perform(put("/api/race-results")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(raceResult)))
            .andExpect(status().isBadRequest());

        // Validate the RaceResult in the database
        List<RaceResult> raceResultList = raceResultRepository.findAll();
        assertThat(raceResultList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRaceResult() throws Exception {
        // Initialize the database
        raceResultRepository.saveAndFlush(raceResult);

        int databaseSizeBeforeDelete = raceResultRepository.findAll().size();

        // Get the raceResult
        restRaceResultMockMvc.perform(delete("/api/race-results/{id}", raceResult.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RaceResult> raceResultList = raceResultRepository.findAll();
        assertThat(raceResultList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RaceResult.class);
        RaceResult raceResult1 = new RaceResult();
        raceResult1.setId(1L);
        RaceResult raceResult2 = new RaceResult();
        raceResult2.setId(raceResult1.getId());
        assertThat(raceResult1).isEqualTo(raceResult2);
        raceResult2.setId(2L);
        assertThat(raceResult1).isNotEqualTo(raceResult2);
        raceResult1.setId(null);
        assertThat(raceResult1).isNotEqualTo(raceResult2);
    }
}
