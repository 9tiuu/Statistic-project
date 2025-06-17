import imagen from '../img/bg-project.png';
import Navbar from "../components/Navbar";

const InfoPage = () => {
    return (
        <main className="relative">
            <Navbar />
            <div className="relative p-4 w-full h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${imagen})`, backgroundPosition: 'bottom', backgroundSize: 'cover' }}>
                <div className="md:w-5/12 md:p-10 p-5 rounded-lg bg-white border-b-4 border-red-600">
                    <p className='p-1 rounded bg-red-700 text-xs font-bold text-white w-44 text-center'>Aplicación de Derivadas</p>
                    <h2 className='text-2xl font-bold border-b-2 border-red-600 py-4 mb-4'>Optimización del tamaño de fragmentos de transferencias de archivos en un sector de telecomunicaciones.</h2>
                    <p className='mb-4'>
                        En una empresa de telecomunicaciones, se realizará un proceso de fragmentación de archivos determinados, de la cual serán transmitidos y almacenados en los servidores en la nube de la empresa. Los técnicos encargados de realizar el proceso, necesitan transmitir archivos de distintos tamaños (108 MB, 256 MB y 500 MB) considerando el costo técnico de reensamblaje, para ello, necesitan determinar cuál es el valor óptico de paquetes y el tamaño recomendado para un archivo a fragmentar, con el objetivo de minimizar los costos de reensamblaje mediante. 
                        <br></br><br></br>Como no existe una estrategia clave que ayude a los técnicos a obtener los resultados de manera rápida, se requiere la creación de un sistema de recomendación que ayude a los técnicos a calcular la cantidad óptica de paquetes como también, el tamaño de fragmentos recomendados con el fin de determinar el costo total esperado.
                    </p>
                </div>
            </div>
        </main>
    )
};
export default InfoPage;