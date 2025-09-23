import Carousel from "react-bootstrap/Carousel";

function CarouselPrincipal() {
  return (
    <Carousel fade className="custom-carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/foto-gratuito/gli-indumenti-multicolori-sono-appesi-agli-appendiabiti-nel-negozio-al-dettaglio-generato-dall-intelligenza-artificiale_188544-19853.jpg"
          alt="First slide"
        />
        <Carousel.Caption className="bg-dark bg-opacity-25 rounded  ">
          <h3>Stile senza compromessi</h3>
          <p className="text-white">Rinnova il tuo guardaroba con capi esclusivi.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1614990354198-b06764dcb13c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Carousel.Caption className="bg-dark bg-opacity-25 rounded  ">
          <h3>Il tuo nuovo armadio con un click</h3>
          <p className="text-white">Aggiungi al carrello i tuo annunci preferiti.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kYXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Third slide"
        />
        <Carousel.Caption className="bg-dark bg-opacity-25 rounded  ">
          <h3>Una nuova vita per i tuoi capi </h3>
          <p className="text-white">Pubblica annunci e condividi vibes con la community.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselPrincipal;
