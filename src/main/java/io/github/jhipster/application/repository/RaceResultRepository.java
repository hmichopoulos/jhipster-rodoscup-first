package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.RaceResult;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RaceResult entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RaceResultRepository extends JpaRepository<RaceResult, Long> {

}
