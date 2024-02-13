package org.lamisplus.modules.hepatitis.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import com.foreach.across.core.installers.InstallerRunCondition;
import org.springframework.core.annotation.Order;

@Order(2)
@Installer(name = "update-columns",
        description = "add new columns",
        runCondition = InstallerRunCondition.AlwaysRun)
public class ColumnUpdate extends AcrossLiquibaseInstaller {
    public ColumnUpdate() {
        super ("classpath:installers/hepatitis/schema/add-new-columns.xml");
    }
}
