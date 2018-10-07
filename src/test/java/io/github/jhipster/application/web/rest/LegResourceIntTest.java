package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.RodosCupManagerApp;

import io.github.jhipster.application.domain.Leg;
import io.github.jhipster.application.repository.LegRepository;
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
 * Test class for the LegResource REST controller.
 *
 * @see LegResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RodosCupManagerApp.class)
public class LegResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private LegRepository legRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLegMockMvc;

    private Leg leg;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LegResource legResource = new LegResource(legRepository);
        this.restLegMockMvc = MockMvcBuilders.standaloneSetup(legResource)
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
    public static Leg createEntity(EntityManager em) {
        Leg leg = new Leg()
            .name(DEFAULT_NAME);
        return leg;
    }

    @Before
    public void initTest() {
        leg = createEntity(em);
    }

    @Test
    @Transactional
    public void createLeg() throws Exception {
        int databaseSizeBeforeCreate = legRepository.findAll().size();

        // Create the Leg
        restLegMockMvc.perform(post("/api/legs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leg)))
            .andExpect(status().isCreated());

        // Validate the Leg in the database
        List<Leg> legList = legRepository.findAll();
        assertThat(legList).hasSize(databaseSizeBeforeCreate + 1);
        Leg testLeg = legList.get(legList.size() - 1);
        assertThat(testLeg.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createLegWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = legRepository.findAll().size();

        // Create the Leg with an existing ID
        leg.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLegMockMvc.perform(post("/api/legs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leg)))
            .andExpect(status().isBadRequest());

        // Validate the Leg in the database
        List<Leg> legList = legRepository.findAll();
        assertThat(legList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllLegs() throws Exception {
        // Initialize the database
        legRepository.saveAndFlush(leg);

        // Get all the legList
        restLegMockMvc.perform(get("/api/legs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(leg.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getLeg() throws Exception {
        // Initialize the database
        legRepository.saveAndFlush(leg);

        // Get the leg
        restLegMockMvc.perform(get("/api/legs/{id}", leg.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(leg.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLeg() throws Exception {
        // Get the leg
        restLegMockMvc.perform(get("/api/legs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLeg() throws Exception {
        // Initialize the database
        legRepository.saveAndFlush(leg);

        int databaseSizeBeforeUpdate = legRepository.findAll().size();

        // Update the leg
        Leg updatedLeg = legRepository.findById(leg.getId()).get();
        // Disconnect from session so that the updates on updatedLeg are not directly saved in db
        em.detach(updatedLeg);
        updatedLeg
            .name(UPDATED_NAME);

        restLegMockMvc.perform(put("/api/legs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLeg)))
            .andExpect(status().isOk());

        // Validate the Leg in the database
        List<Leg> legList = legRepository.findAll();
        assertThat(legList).hasSize(databaseSizeBeforeUpdate);
        Leg testLeg = legList.get(legList.size() - 1);
        assertThat(testLeg.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingLeg() throws Exception {
        int databaseSizeBeforeUpdate = legRepository.findAll().size();

        // Create the Leg

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLegMockMvc.perform(put("/api/legs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leg)))
            .andExpect(status().isBadRequest());

        // Validate the Leg in the database
        List<Leg> legList = legRepository.findAll();
        assertThat(legList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLeg() throws Exception {
        // Initialize the database
        legRepository.saveAndFlush(leg);

        int databaseSizeBeforeDelete = legRepository.findAll().size();

        // Get the leg
        restLegMockMvc.perform(delete("/api/legs/{id}", leg.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Leg> legList = legRepository.findAll();
        assertThat(legList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Leg.class);
        Leg leg1 = new Leg();
        leg1.setId(1L);
        Leg leg2 = new Leg();
        leg2.setId(leg1.getId());
        assertThat(leg1).isEqualTo(leg2);
        leg2.setId(2L);
        assertThat(leg1).isNotEqualTo(leg2);
        leg1.setId(null);
        assertThat(leg1).isNotEqualTo(leg2);
    }
}
