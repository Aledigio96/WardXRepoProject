package alessandro.digiovanni.demo.exceptions;

public class UnauthorizedAnnuncioAccessException extends RuntimeException {
    public UnauthorizedAnnuncioAccessException(String message) {
        super(message);
    }
}
