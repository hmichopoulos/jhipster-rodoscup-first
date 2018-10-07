package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Leg;
import io.github.jhipster.application.repository.LegRepository;
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
 * REST controller for managing Leg.
 */
@RestController
@RequestMapping("/api")
public class LegResource {

    private final Logger log = LoggerFactory.getLogger(LegResource.class);

    private static final String ENTITY_NAME = "leg";

    private final LegRepository legRepository;

    public LegResource(LegRepository legRepository) {
        this.legRepository = legRepository;
    }

    /**
     * POST  /legs : Create a new leg.
     *
     * @param leg the leg to create
     * @return the ResponseEntity with status 201 (Created) and with body the new leg, or with status 400 (Bad Request) if the leg has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/legs")
    @Timed
    public ResponseEntity<Leg> createLeg(@RequestBody Leg leg) throws URISyntaxException {
        log.debug("REST request to save Leg : {}", leg);
        if (leg.getId() != null) {
            throw new BadRequestAlertException("A new leg cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Leg result = legRepository.save(leg);
        return ResponseEntity.created(new URI("/api/legs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /legs : Updates an existing leg.
     *
     * @param leg the leg to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated leg,
     * or with status 400 (Bad Request) if the leg is not valid,
     * or with status 500 (Internal Server Error) if the leg couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/legs")
    @Timed
    public ResponseEntity<Leg> updateLeg(@RequestBody Leg leg) throws URISyntaxException {
        log.debug("REST request to update Leg : {}", leg);
        if (leg.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Leg result = legRepository.save(leg);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, leg.getId().toString()))
            .body(result);
    }

    /**
     * GET  /legs : get all the legs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of legs in body
     */
    @GetMapping("/legs")
    @Timed
    public List<Leg> getAllLegs() {
        log.debug("REST request to get all Legs");
        return legRepository.findAll();
    }

    /**
     * GET  /legs/:id : get the "id" leg.
     *
     * @param id the id of the leg to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the leg, or with status 404 (Not Found)
     */
    @GetMapping("/legs/{id}")
    @Timed
    public ResponseEntity<Leg> getLeg(@PathVariable Long id) {
        log.debug("REST request to get Leg : {}", id);
        Optional<Leg> leg = legRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(leg);
    }

    /**
     * DELETE  /legs/:id : delete the "id" leg.
     *
     * @param id the id of the leg to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/legs/{id}")
    @Timed
    public ResponseEntity<Void> deleteLeg(@PathVariable Long id) {
        log.debug("REST request to delete Leg : {}", id);

        legRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
