package org.lamisplus.modules.hepatitis.repository;


import org.lamisplus.modules.hepatitis.domain.entity.HepatitisEnrollment;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisFollowup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowupRepository extends JpaRepository<HepatitisFollowup, Long> {

    boolean existsByHepatitisEnrollment_Uuid(String uuid);
    boolean existsHepatitisFollowupByHepatitisEnrollment_Uuid(String enrollmentUuid);

    HepatitisFollowup findHepatitisFollowupByHepatitisEnrollmentAndArchived(HepatitisEnrollment enrollment, Integer archived);

    List<HepatitisFollowup> findHepatitisFollowupsByHepatitisEnrollmentAndArchived(HepatitisEnrollment enrollment, Integer archived);

    HepatitisFollowup findHepatitisFollowupsByIdAndArchived(Long id, Integer archived);

}
