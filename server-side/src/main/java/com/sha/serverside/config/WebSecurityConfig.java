package com.sha.serverside.config;

import com.sha.serverside.jwt.JwtAuthorizationFilter;
import com.sha.serverside.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //Cross-origin-resource-sharing: localhost:8080, localhost:4200, 3000(allow for it.)
        http.cors().and()
                .authorizeRequests()
                //These are public pages.
                .antMatchers("/resources/**", "/error", "/api/user/**").permitAll()
                //These can be reachable for just have student role.
                .antMatchers("/api/student/**").hasRole("STUDENT")
                //These can be reachable for just have teacher role.
                .antMatchers("/api/teacher/**").hasRole("TEACHER")
                //These can be reachable for just have manager role.
                .antMatchers("/api/manager/**").hasRole("MANAGER")
                //All reamining paths should need authentication.
                .anyRequest().fullyAuthenticated()
                .and()
                //Logout will log the user out by invalidated session.
                .logout().permitAll()
                .logoutRequestMatcher(new AntPathRequestMatcher("/api/user/logout", "POST"))
                .and()
                //login form and path.
                .formLogin().loginPage("/api/user/login").and()
                //Enable basic authentication http header "basic: username:password"
                .httpBasic().and()
                //Cross side request forgery.
                .csrf().disable();

        //jwt filter
        http.addFilter(new JwtAuthorizationFilter(authenticationManager(), jwtTokenProvider));
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*").allowedMethods("*");
            }
        };
    }
}
