package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.RaceResult;
import io.github.jhipster.application.repository.RaceResultRepository;
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
 * REST controller for managing RaceResult.
 */
@RestController
@RequestMapping("/api")
public class RaceResultResource {

    private final Logger log = LoggerFactory.getLogger(RaceResultResource.class);

    private static final String ENTITY_NAME = "raceResult";

    private final RaceResultRepository raceResultRepository;

    public RaceResultResource(RaceResultRepository raceResultRepository) {
        this.raceResultRepository = raceResultRepository;
    }

    /**
     * POST  /race-results : Create a new raceResult.
     *
     * @param raceResult the raceResult to create
     * @return the ResponseEntity with status 201 (Created) and with body the new raceResult, or with status 400 (Bad Request) if the raceResult has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/race-results")
    @Timed
    public ResponseEntity<RaceResult> createRaceResult(@RequestBody RaceResult raceResult) throws URISyntaxException {
        log.debug("REST request to save RaceResult : {}", raceResult);
        if (raceResult.getId() != null) {
            throw new BadRequestAlertException("A new raceResult cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RaceResult result = raceResultRepository.save(raceResult);
        return ResponseEntity.created(new URI("/api/race-results/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /race-results : Updates an existing raceResult.
     *
     * @param raceResult the raceResult to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated raceResult,
     * or with status 400 (Bad Request) if the raceResult is not valid,
     * or with status 500 (Internal Server Error) if the raceResult couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/race-results")
    @Timed
    public ResponseEntity<RaceResult> updateRaceResult(@RequestBody RaceResult raceResult) throws URISyntaxException {
        log.debug("REST request to update RaceResult : {}", raceResult);
        if (raceResult.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RaceResult result = raceResultRepository.save(raceResult);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, raceResult.getId().toString()))
            .body(result);
    }

    /**
     * GET  /race-results : get all the raceResults.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of raceResults in body
     */
    @GetMapping("/race-results")
    @Timed
    public List<RaceResult> getAllRaceResults() {
        log.debug("REST request to get all RaceResults");
        return raceResultRepository.findAll();
    }

    /**
     * GET  /race-results/:id : get the "id" raceResult.
     *
     * @param id the id of the raceResult to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the raceResult, or with status 404 (Not Found)
     */
    @GetMapping("/race-results/{id}")
    @Timed
    public ResponseEntity<RaceResult> getRaceResult(@PathVariable Long id) {
        log.debug("REST request to get RaceResult : {}", id);
        Optional<RaceResult> raceResult = raceResultRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(raceResult);
    }

    /**
     * DELETE  /race-results/:id : delete the "id" raceResult.
     *
     * @param id the id of the raceResult to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/race-results/{id}")
    @Timed
    public ResponseEntity<Void> deleteRaceResult(@PathVariable Long id) {
        log.debug("REST request to delete RaceResult : {}", id);

        raceResultRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
