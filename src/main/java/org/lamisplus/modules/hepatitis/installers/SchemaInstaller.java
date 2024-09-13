package org.lamisplus.modules.hepatitis.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import com.foreach.across.core.installers.InstallerRunCondition;
import org.springframework.core.annotation.Order;

@Order(1)
@Installer(name = "schema-installer-hepatitis",
        description = "Installs the required database for hepatitis tables",
        version = 2,
        runCondition = InstallerRunCondition.AlwaysRun)
public class SchemaInstaller extends AcrossLiquibaseInstaller {
    public SchemaInstaller() {
        super("classpath:installers/hepatitis/schema/schema.xml");
    }
}
