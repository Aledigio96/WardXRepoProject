package alessandro.digiovanni.demo.exceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException(Integer id) {
        super("La risorsa con id " + id + " non è stata trovata!");
    }
    public NotFoundException(String message){
        super(message);
    }
}
