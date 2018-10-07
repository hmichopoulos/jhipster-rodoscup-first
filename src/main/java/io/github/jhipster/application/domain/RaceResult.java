package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A RaceResult.
 */
@Entity
@Table(name = "race_result")
public class RaceResult implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "url")
    private String url;

    @OneToMany(mappedBy = "raceResult")
    private Set<Leg> legs = new HashSet<>();
    @OneToMany(mappedBy = "raceResult")
    private Set<YachtCategory> categories = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public RaceResult url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Set<Leg> getLegs() {
        return legs;
    }

    public RaceResult legs(Set<Leg> legs) {
        this.legs = legs;
        return this;
    }

    public RaceResult addLeg(Leg leg) {
        this.legs.add(leg);
        leg.setRaceResult(this);
        return this;
    }

    public RaceResult removeLeg(Leg leg) {
        this.legs.remove(leg);
        leg.setRaceResult(null);
        return this;
    }

    public void setLegs(Set<Leg> legs) {
        this.legs = legs;
    }

    public Set<YachtCategory> getCategories() {
        return categories;
    }

    public RaceResult categories(Set<YachtCategory> yachtCategories) {
        this.categories = yachtCategories;
        return this;
    }

    public RaceResult addCategory(YachtCategory yachtCategory) {
        this.categories.add(yachtCategory);
        yachtCategory.setRaceResult(this);
        return this;
    }

    public RaceResult removeCategory(YachtCategory yachtCategory) {
        this.categories.remove(yachtCategory);
        yachtCategory.setRaceResult(null);
        return this;
    }

    public void setCategories(Set<YachtCategory> yachtCategories) {
        this.categories = yachtCategories;
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
        RaceResult raceResult = (RaceResult) o;
        if (raceResult.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), raceResult.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RaceResult{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            "}";
    }
}
