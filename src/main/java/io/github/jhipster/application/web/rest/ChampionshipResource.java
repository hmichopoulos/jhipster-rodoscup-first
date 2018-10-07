package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Championship;
import io.github.jhipster.application.repository.ChampionshipRepository;
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
 * REST controller for managing Championship.
 */
@RestController
@RequestMapping("/api")
public class ChampionshipResource {

    private final Logger log = LoggerFactory.getLogger(ChampionshipResource.class);

    private static final String ENTITY_NAME = "championship";

    private final ChampionshipRepository championshipRepository;

    public ChampionshipResource(ChampionshipRepository championshipRepository) {
        this.championshipRepository = championshipRepository;
    }

    /**
     * POST  /championships : Create a new championship.
     *
     * @param championship the championship to create
     * @return the ResponseEntity with status 201 (Created) and with body the new championship, or with status 400 (Bad Request) if the championship has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/championships")
    @Timed
    public ResponseEntity<Championship> createChampionship(@RequestBody Championship championship) throws URISyntaxException {
        log.debug("REST request to save Championship : {}", championship);
        if (championship.getId() != null) {
            throw new BadRequestAlertException("A new championship cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Championship result = championshipRepository.save(championship);
        return ResponseEntity.created(new URI("/api/championships/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /championships : Updates an existing championship.
     *
     * @param championship the championship to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated championship,
     * or with status 400 (Bad Request) if the championship is not valid,
     * or with status 500 (Internal Server Error) if the championship couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/championships")
    @Timed
    public ResponseEntity<Championship> updateChampionship(@RequestBody Championship championship) throws URISyntaxException {
        log.debug("REST request to update Championship : {}", championship);
        if (championship.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Championship result = championshipRepository.save(championship);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, championship.getId().toString()))
            .body(result);
    }

    /**
     * GET  /championships : get all the championships.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of championships in body
     */
    @GetMapping("/championships")
    @Timed
    public List<Championship> getAllChampionships() {
        log.debug("REST request to get all Championships");
        return championshipRepository.findAll();
    }

    /**
     * GET  /championships/:id : get the "id" championship.
     *
     * @param id the id of the championship to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the championship, or with status 404 (Not Found)
     */
    @GetMapping("/championships/{id}")
    @Timed
    public ResponseEntity<Championship> getChampionship(@PathVariable Long id) {
        log.debug("REST request to get Championship : {}", id);
        Optional<Championship> championship = championshipRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(championship);
    }

    /**
     * DELETE  /championships/:id : delete the "id" championship.
     *
     * @param id the id of the championship to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/championships/{id}")
    @Timed
    public ResponseEntity<Void> deleteChampionship(@PathVariable Long id) {
        log.debug("REST request to delete Championship : {}", id);

        championshipRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
