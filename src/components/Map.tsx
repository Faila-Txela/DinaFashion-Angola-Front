
function Map() {
  return (
    <div className="flex items-center justify-center flex-col g-12">
      <h1 className="text-2xl">Onde nos achar para pegar suas encomendas?</h1>
      <p className="text-gray-800">Estamos no munípio do Rangel, Mercado dos Congolenses, Rua Nelito Soares</p>
      <div className="rounded-lg shadow-2xl w-full md:w-3/4 lg:w-1/2 overflow-hidden">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31540.213998513198!2d13.2548055!3d-8.830450300000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f3d90d253115%3A0x21c7ccfcadec84e0!2sMercado%20dos%20Congolenses!5e0!3m2!1spt-PT!2sao!4v1760450222835!5m2!1spt-PT!2sao" title="map" width="600" height="500" className="border-0" loading="lazy"></iframe>
      </div>
    </div>
  )
}

export default Map