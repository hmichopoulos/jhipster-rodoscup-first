package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.YachtCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the YachtCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface YachtCategoryRepository extends JpaRepository<YachtCategory, Long> {

}
