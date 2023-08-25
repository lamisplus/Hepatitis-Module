package org.lamisplus.modules.hepatitis.repositories;

import org.lamisplus.modules.hepatitis.domain.entities.Screening;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScreeningRepository extends JpaRepository<Screening,Long> {

}
