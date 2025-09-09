import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function FooterNew() {
  return (
    <footer className="d-flex bg-dark mt-2 fixed-bottom py-4">
      <div className="text-center text-white m-auto p-2 fs-5">
        <div className="d-inline-block text-center text-nowrap fs-6">
          <h5>Chi siamo</h5>
          <p>Informazioni sulla nostra azienda.</p>
        </div>
        <div className="d-inline-block text-center text-nowrap ms-3 fs-6">
          <h5>Link utili</h5>
          <p>Contatti</p>
        </div>
        <div className="d-inline-block text-center text-nowrap ms-3 fs-6">Messaggiaci su Whatsapp: 3312324267</div>
        <hr className="border-light" />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} WardX. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
}

export default FooterNew;
