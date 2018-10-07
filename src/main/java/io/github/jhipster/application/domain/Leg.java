package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Leg.
 */
@Entity
@Table(name = "leg")
public class Leg implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("legs")
    private Championship championship;

    @ManyToOne
    @JsonIgnoreProperties("legs")
    private RaceResult raceResult;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Leg name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Championship getChampionship() {
        return championship;
    }

    public Leg championship(Championship championship) {
        this.championship = championship;
        return this;
    }

    public void setChampionship(Championship championship) {
        this.championship = championship;
    }

    public RaceResult getRaceResult() {
        return raceResult;
    }

    public Leg raceResult(RaceResult raceResult) {
        this.raceResult = raceResult;
        return this;
    }

    public void setRaceResult(RaceResult raceResult) {
        this.raceResult = raceResult;
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
        Leg leg = (Leg) o;
        if (leg.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), leg.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Leg{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
