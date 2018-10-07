package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Championship.
 */
@Entity
@Table(name = "championship")
public class Championship implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_year")
    private Long year;

    @OneToMany(mappedBy = "championship")
    private Set<Leg> legs = new HashSet<>();
    @OneToMany(mappedBy = "championship")
    private Set<YachtCategory> yachtCategories = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getYear() {
        return year;
    }

    public Championship year(Long year) {
        this.year = year;
        return this;
    }

    public void setYear(Long year) {
        this.year = year;
    }

    public Set<Leg> getLegs() {
        return legs;
    }

    public Championship legs(Set<Leg> legs) {
        this.legs = legs;
        return this;
    }

    public Championship addLeg(Leg leg) {
        this.legs.add(leg);
        leg.setChampionship(this);
        return this;
    }

    public Championship removeLeg(Leg leg) {
        this.legs.remove(leg);
        leg.setChampionship(null);
        return this;
    }

    public void setLegs(Set<Leg> legs) {
        this.legs = legs;
    }

    public Set<YachtCategory> getYachtCategories() {
        return yachtCategories;
    }

    public Championship yachtCategories(Set<YachtCategory> yachtCategories) {
        this.yachtCategories = yachtCategories;
        return this;
    }

    public Championship addYachtCategory(YachtCategory yachtCategory) {
        this.yachtCategories.add(yachtCategory);
        yachtCategory.setChampionship(this);
        return this;
    }

    public Championship removeYachtCategory(YachtCategory yachtCategory) {
        this.yachtCategories.remove(yachtCategory);
        yachtCategory.setChampionship(null);
        return this;
    }

    public void setYachtCategories(Set<YachtCategory> yachtCategories) {
        this.yachtCategories = yachtCategories;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Championship championship = (Championship) o;
        if (championship.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), championship.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Championship{" +
            "id=" + getId() +
            ", year=" + getYear() +
            "}";
    }
}
