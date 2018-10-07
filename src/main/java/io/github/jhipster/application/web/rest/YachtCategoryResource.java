package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.YachtCategory;
import io.github.jhipster.application.repository.YachtCategoryRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing YachtCategory.
 */
@RestController
@RequestMapping("/api")
public class YachtCategoryResource {

    private final Logger log = LoggerFactory.getLogger(YachtCategoryResource.class);

    private static final String ENTITY_NAME = "yachtCategory";

    private final YachtCategoryRepository yachtCategoryRepository;

    public YachtCategoryResource(YachtCategoryRepository yachtCategoryRepository) {
        this.yachtCategoryRepository = yachtCategoryRepository;
    }

    /**
     * POST  /yacht-categories : Create a new yachtCategory.
     *
     * @param yachtCategory the yachtCategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new yachtCategory, or with status 400 (Bad Request) if the yachtCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/yacht-categories")
    @Timed
    public ResponseEntity<YachtCategory> createYachtCategory(@RequestBody YachtCategory yachtCategory) throws URISyntaxException {
        log.debug("REST request to save YachtCategory : {}", yachtCategory);
        if (yachtCategory.getId() != null) {
            throw new BadRequestAlertException("A new yachtCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        YachtCategory result = yachtCategoryRepository.save(yachtCategory);
        return ResponseEntity.created(new URI("/api/yacht-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /yacht-categories : Updates an existing yachtCategory.
     *
     * @param yachtCategory the yachtCategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated yachtCategory,
     * or with status 400 (Bad Request) if the yachtCategory is not valid,
     * or with status 500 (Internal Server Error) if the yachtCategory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/yacht-categories")
    @Timed
    public ResponseEntity<YachtCategory> updateYachtCategory(@RequestBody YachtCategory yachtCategory) throws URISyntaxException {
        log.debug("REST request to update YachtCategory : {}", yachtCategory);
        if (yachtCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        YachtCategory result = yachtCategoryRepository.save(yachtCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, yachtCategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /yacht-categories : get all the yachtCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of yachtCategories in body
     */
    @GetMapping("/yacht-categories")
    @Timed
    public List<YachtCategory> getAllYachtCategories() {
        log.debug("REST request to get all YachtCategories");
        return yachtCategoryRepository.findAll();
    }

    /**
     * GET  /yacht-categories/:id : get the "id" yachtCategory.
     *
     * @param id the id of the yachtCategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the yachtCategory, or with status 404 (Not Found)
     */
    @GetMapping("/yacht-categories/{id}")
    @Timed
    public ResponseEntity<YachtCategory> getYachtCategory(@PathVariable Long id) {
        log.debug("REST request to get YachtCategory : {}", id);
        Optional<YachtCategory> yachtCategory = yachtCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(yachtCategory);
    }

    /**
     * DELETE  /yacht-categories/:id : delete the "id" yachtCategory.
     *
     * @param id the id of the yachtCategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/yacht-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteYachtCategory(@PathVariable Long id) {
        log.debug("REST request to delete YachtCategory : {}", id);

        yachtCategoryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
