package alessandro.digiovanni.demo.configurations;

import alessandro.digiovanni.demo.entities.User;
import alessandro.digiovanni.demo.exceptions.UnauthorizedException;
import alessandro.digiovanni.demo.services.UserService;
import alessandro.digiovanni.demo.tools.JWTTools;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTCheckerFilter extends OncePerRequestFilter {


    @Autowired
    private JWTTools jwtTools;
    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException, ServletException {

        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer "))
            throw new UnauthorizedException("Token non valido");


        String accessToken = authHeader.replace("Bearer ", "");


        jwtTools.verifyToken(accessToken);




        String userId = jwtTools.extractIdFromToken(accessToken);
        long parsedId = Long.parseLong(userId);
        User currentUser = this.userService.findById(parsedId);


        Authentication authentication = new UsernamePasswordAuthenticationToken(currentUser, null, currentUser.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);


        filterChain.doFilter(request, response);

    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        String method = request.getMethod();

        AntPathMatcher matcher = new AntPathMatcher();

        return matcher.match("/auth/**", path) ||
                ("GET".equalsIgnoreCase(method) && (
                        matcher.match("/api/annunci", path) ||
                                matcher.match("/api/annunci/*", path)||
                                matcher.match("/api/search", path)
                ));
    }

}