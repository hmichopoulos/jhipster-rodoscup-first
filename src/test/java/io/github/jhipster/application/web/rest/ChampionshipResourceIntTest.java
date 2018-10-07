package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.RodosCupManagerApp;

import io.github.jhipster.application.domain.Championship;
import io.github.jhipster.application.repository.ChampionshipRepository;
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
 * Test class for the ChampionshipResource REST controller.
 *
 * @see ChampionshipResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RodosCupManagerApp.class)
public class ChampionshipResourceIntTest {

    private static final Long DEFAULT_YEAR = 1L;
    private static final Long UPDATED_YEAR = 2L;

    @Autowired
    private ChampionshipRepository championshipRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restChampionshipMockMvc;

    private Championship championship;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChampionshipResource championshipResource = new ChampionshipResource(championshipRepository);
        this.restChampionshipMockMvc = MockMvcBuilders.standaloneSetup(championshipResource)
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
    public static Championship createEntity(EntityManager em) {
        Championship championship = new Championship()
            .year(DEFAULT_YEAR);
        return championship;
    }

    @Before
    public void initTest() {
        championship = createEntity(em);
    }

    @Test
    @Transactional
    public void createChampionship() throws Exception {
        int databaseSizeBeforeCreate = championshipRepository.findAll().size();

        // Create the Championship
        restChampionshipMockMvc.perform(post("/api/championships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(championship)))
            .andExpect(status().isCreated());

        // Validate the Championship in the database
        List<Championship> championshipList = championshipRepository.findAll();
        assertThat(championshipList).hasSize(databaseSizeBeforeCreate + 1);
        Championship testChampionship = championshipList.get(championshipList.size() - 1);
        assertThat(testChampionship.getYear()).isEqualTo(DEFAULT_YEAR);
    }

    @Test
    @Transactional
    public void createChampionshipWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = championshipRepository.findAll().size();

        // Create the Championship with an existing ID
        championship.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChampionshipMockMvc.perform(post("/api/championships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(championship)))
            .andExpect(status().isBadRequest());

        // Validate the Championship in the database
        List<Championship> championshipList = championshipRepository.findAll();
        assertThat(championshipList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllChampionships() throws Exception {
        // Initialize the database
        championshipRepository.saveAndFlush(championship);

        // Get all the championshipList
        restChampionshipMockMvc.perform(get("/api/championships?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(championship.getId().intValue())))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR.intValue())));
    }
    
    @Test
    @Transactional
    public void getChampionship() throws Exception {
        // Initialize the database
        championshipRepository.saveAndFlush(championship);

        // Get the championship
        restChampionshipMockMvc.perform(get("/api/championships/{id}", championship.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(championship.getId().intValue()))
            .andExpect(jsonPath("$.year").value(DEFAULT_YEAR.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingChampionship() throws Exception {
        // Get the championship
        restChampionshipMockMvc.perform(get("/api/championships/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChampionship() throws Exception {
        // Initialize the database
        championshipRepository.saveAndFlush(championship);

        int databaseSizeBeforeUpdate = championshipRepository.findAll().size();

        // Update the championship
        Championship updatedChampionship = championshipRepository.findById(championship.getId()).get();
        // Disconnect from session so that the updates on updatedChampionship are not directly saved in db
        em.detach(updatedChampionship);
        updatedChampionship
            .year(UPDATED_YEAR);

        restChampionshipMockMvc.perform(put("/api/championships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedChampionship)))
            .andExpect(status().isOk());

        // Validate the Championship in the database
        List<Championship> championshipList = championshipRepository.findAll();
        assertThat(championshipList).hasSize(databaseSizeBeforeUpdate);
        Championship testChampionship = championshipList.get(championshipList.size() - 1);
        assertThat(testChampionship.getYear()).isEqualTo(UPDATED_YEAR);
    }

    @Test
    @Transactional
    public void updateNonExistingChampionship() throws Exception {
        int databaseSizeBeforeUpdate = championshipRepository.findAll().size();

        // Create the Championship

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChampionshipMockMvc.perform(put("/api/championships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(championship)))
            .andExpect(status().isBadRequest());

        // Validate the Championship in the database
        List<Championship> championshipList = championshipRepository.findAll();
        assertThat(championshipList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChampionship() throws Exception {
        // Initialize the database
        championshipRepository.saveAndFlush(championship);

        int databaseSizeBeforeDelete = championshipRepository.findAll().size();

        // Get the championship
        restChampionshipMockMvc.perform(delete("/api/championships/{id}", championship.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Championship> championshipList = championshipRepository.findAll();
        assertThat(championshipList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Championship.class);
        Championship championship1 = new Championship();
        championship1.setId(1L);
        Championship championship2 = new Championship();
        championship2.setId(championship1.getId());
        assertThat(championship1).isEqualTo(championship2);
        championship2.setId(2L);
        assertThat(championship1).isNotEqualTo(championship2);
        championship1.setId(null);
        assertThat(championship1).isNotEqualTo(championship2);
    }
}
