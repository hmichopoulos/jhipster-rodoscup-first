package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Leg;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Leg entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LegRepository extends JpaRepository<Leg, Long> {

}
