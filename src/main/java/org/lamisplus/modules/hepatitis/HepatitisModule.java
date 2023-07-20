package org.lamisplus.modules.hepatitis;

import com.foreach.across.config.AcrossApplication;
import com.foreach.across.core.AcrossModule;
import com.foreach.across.core.context.configurer.ComponentScanConfigurer;
@AcrossApplication(
        modules = {
        })
public class HepatitisModule extends AcrossModule {
    public static final String NAME = "HepatitisModule";
    public HepatitisModule() {
        super ();
        addApplicationContextConfigurer (new ComponentScanConfigurer(
                getClass ().getPackage ().getName () + ".repository",
                getClass ().getPackage ().getName () + ".service",
                getClass ().getPackage ().getName () + ".controller",
                getClass ().getPackage ().getName () + ".utility",
                "org.springframework.web.socket"
        ));
    }
    @Override
    public String getName() {
        return NAME;
    }
}
