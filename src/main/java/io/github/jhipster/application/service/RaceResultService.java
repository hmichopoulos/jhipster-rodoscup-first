package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.RaceResult;
import io.github.jhipster.application.repository.RaceResultRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing RaceResult.
 */
@Service
@Transactional
public class RaceResultService {

    private final Logger log = LoggerFactory.getLogger(RaceResultService.class);

    private final RaceResultRepository raceResultRepository;

    public RaceResultService(RaceResultRepository raceResultRepository) {
        this.raceResultRepository = raceResultRepository;
    }

    /**
     * Save a raceResult.
     *
     * @param raceResult the entity to save
     * @return the persisted entity
     */
    public RaceResult save(RaceResult raceResult) {
        log.debug("Request to save RaceResult : {}", raceResult);
        return raceResultRepository.save(raceResult);
    }

    /**
     * Get all the raceResults.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<RaceResult> findAll() {
        log.debug("Request to get all RaceResults");
        return raceResultRepository.findAll();
    }


    /**
     * Get one raceResult by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<RaceResult> findOne(Long id) {
        log.debug("Request to get RaceResult : {}", id);
        return raceResultRepository.findById(id);
    }

    /**
     * Delete the raceResult by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete RaceResult : {}", id);
        raceResultRepository.deleteById(id);
    }
}
