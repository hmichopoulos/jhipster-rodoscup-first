package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.RodosCupManagerApp;

import io.github.jhipster.application.domain.YachtCategory;
import io.github.jhipster.application.repository.YachtCategoryRepository;
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
 * Test class for the YachtCategoryResource REST controller.
 *
 * @see YachtCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RodosCupManagerApp.class)
public class YachtCategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private YachtCategoryRepository yachtCategoryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restYachtCategoryMockMvc;

    private YachtCategory yachtCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final YachtCategoryResource yachtCategoryResource = new YachtCategoryResource(yachtCategoryRepository);
        this.restYachtCategoryMockMvc = MockMvcBuilders.standaloneSetup(yachtCategoryResource)
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
    public static YachtCategory createEntity(EntityManager em) {
        YachtCategory yachtCategory = new YachtCategory()
            .name(DEFAULT_NAME);
        return yachtCategory;
    }

    @Before
    public void initTest() {
        yachtCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createYachtCategory() throws Exception {
        int databaseSizeBeforeCreate = yachtCategoryRepository.findAll().size();

        // Create the YachtCategory
        restYachtCategoryMockMvc.perform(post("/api/yacht-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yachtCategory)))
            .andExpect(status().isCreated());

        // Validate the YachtCategory in the database
        List<YachtCategory> yachtCategoryList = yachtCategoryRepository.findAll();
        assertThat(yachtCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        YachtCategory testYachtCategory = yachtCategoryList.get(yachtCategoryList.size() - 1);
        assertThat(testYachtCategory.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createYachtCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = yachtCategoryRepository.findAll().size();

        // Create the YachtCategory with an existing ID
        yachtCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restYachtCategoryMockMvc.perform(post("/api/yacht-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yachtCategory)))
            .andExpect(status().isBadRequest());

        // Validate the YachtCategory in the database
        List<YachtCategory> yachtCategoryList = yachtCategoryRepository.findAll();
        assertThat(yachtCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllYachtCategories() throws Exception {
        // Initialize the database
        yachtCategoryRepository.saveAndFlush(yachtCategory);

        // Get all the yachtCategoryList
        restYachtCategoryMockMvc.perform(get("/api/yacht-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(yachtCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getYachtCategory() throws Exception {
        // Initialize the database
        yachtCategoryRepository.saveAndFlush(yachtCategory);

        // Get the yachtCategory
        restYachtCategoryMockMvc.perform(get("/api/yacht-categories/{id}", yachtCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(yachtCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingYachtCategory() throws Exception {
        // Get the yachtCategory
        restYachtCategoryMockMvc.perform(get("/api/yacht-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateYachtCategory() throws Exception {
        // Initialize the database
        yachtCategoryRepository.saveAndFlush(yachtCategory);

        int databaseSizeBeforeUpdate = yachtCategoryRepository.findAll().size();

        // Update the yachtCategory
        YachtCategory updatedYachtCategory = yachtCategoryRepository.findById(yachtCategory.getId()).get();
        // Disconnect from session so that the updates on updatedYachtCategory are not directly saved in db
        em.detach(updatedYachtCategory);
        updatedYachtCategory
            .name(UPDATED_NAME);

        restYachtCategoryMockMvc.perform(put("/api/yacht-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedYachtCategory)))
            .andExpect(status().isOk());

        // Validate the YachtCategory in the database
        List<YachtCategory> yachtCategoryList = yachtCategoryRepository.findAll();
        assertThat(yachtCategoryList).hasSize(databaseSizeBeforeUpdate);
        YachtCategory testYachtCategory = yachtCategoryList.get(yachtCategoryList.size() - 1);
        assertThat(testYachtCategory.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingYachtCategory() throws Exception {
        int databaseSizeBeforeUpdate = yachtCategoryRepository.findAll().size();

        // Create the YachtCategory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restYachtCategoryMockMvc.perform(put("/api/yacht-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yachtCategory)))
            .andExpect(status().isBadRequest());

        // Validate the YachtCategory in the database
        List<YachtCategory> yachtCategoryList = yachtCategoryRepository.findAll();
        assertThat(yachtCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteYachtCategory() throws Exception {
        // Initialize the database
        yachtCategoryRepository.saveAndFlush(yachtCategory);

        int databaseSizeBeforeDelete = yachtCategoryRepository.findAll().size();

        // Get the yachtCategory
        restYachtCategoryMockMvc.perform(delete("/api/yacht-categories/{id}", yachtCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<YachtCategory> yachtCategoryList = yachtCategoryRepository.findAll();
        assertThat(yachtCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(YachtCategory.class);
        YachtCategory yachtCategory1 = new YachtCategory();
        yachtCategory1.setId(1L);
        YachtCategory yachtCategory2 = new YachtCategory();
        yachtCategory2.setId(yachtCategory1.getId());
        assertThat(yachtCategory1).isEqualTo(yachtCategory2);
        yachtCategory2.setId(2L);
        assertThat(yachtCategory1).isNotEqualTo(yachtCategory2);
        yachtCategory1.setId(null);
        assertThat(yachtCategory1).isNotEqualTo(yachtCategory2);
    }
}
