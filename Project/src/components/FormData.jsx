import { useState } from 'react';
import imagen from '../img/fondoinacap.png';
import logo from '../img/inacap-logo.png';
import * as ss from 'simple-statistics';
import { number } from 'mathjs';

const FormData = () => {
    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(false);
    const [activateModal, setActivateModal] = useState(false);
    const [recommend, setRecommend] = useState(true);

    const [xTable, setXTable] = useState([]);
    const [yTable, setYTable] = useState([]);   

    const [xInput, setXInput] = useState('');
    const [yInput, setYInput] = useState('');

    const [regressionResults, setRegressionResults] = useState([]);
    const [valueA, setValueA] = useState(null);
    const [valueB, setValueB] = useState(null);
    const [linealModel, setLinealModel] = useState(null);

    const FormDataPrevent = (event) => {
        event.preventDefault();

        if (xInput.trim() === '' || yInput.trim() === '') {
            setAlert('Debes ingresar valores para el proceso estadístico');
            setTimeout(() => {setAlert('')}, 3000);

        } else {
            const xList = xInput
                .split('-')
                .map(n => parseFloat(n.trim()))
                .filter(n => !isNaN(n));
            ;

            const yList = yInput
                .split('-')
                .map(n => parseFloat(n.trim()))
                .filter(n => !isNaN(n));
            ;

            if (xList.length !== yList.length) {
                setAlert('La cantidad de valores no coincide en ambas variables');
                setTimeout(() => {setAlert('')}, 3000);
                return;
            };

            setXTable(xList);
            setYTable(yList);

            const regression = ss.linearRegression(xList.map((x, i) => [x, yList[i]]));
            const linear = ss.linearRegressionLine(regression);

            const pendiente = Number(regression.m.toFixed(3));
            const intercepto = Number(regression.b.toFixed(3));
            const coeficiente = Number(ss.sampleCorrelation(xList, yList).toFixed(3));

            // Calcular S
            // const yEstimados = xList.map(x => linear(x));
            // const errores = yList.map((yReal, i) => yReal - yEstimados[i]);
            // const s = Number(ss.standardDeviation(errores).toFixed(3));

            setValueA(intercepto);
            setValueB(pendiente);

            setRegressionResults([
                { label: 'Pendiente (B)', value: pendiente },
                { label: 'Intercepto (A)', value: intercepto },
                { label: 'Coeficiente de correlación (R)', value: coeficiente },
                // { label: 'Error estándar de estimación (S)', value: s }
            ]);

            setAlert('');
            setRecommend(true);
            setLoading(true);

            setTimeout(() => {
                setLoading(false);
            }, 5000);

            console.log('xList:', xList);
            console.log('yList:', yList);
        };
    };

    const CloseRecommendation = () => {
         setRecommend(false);
         setLoading(true);
    };

    const CloseModal = () => {
        setActivateModal(!activateModal);
    };

    return (
        <div className="w-full h-screen bg-cover bg-center flex flex-col justify-center items-center" style={{ backgroundImage: `url(${imagen})`, backgroundPosition: 'bottom', backgroundSize: 'cover' }}>

            <form onSubmit={FormDataPrevent} className="flex rounded-lg flex-col items-center md:w-3/12 w-96 justify-center p-3">
                <div className='relative mb-2 flex justify-center items-center h-32 w-64'>
                    <img src={logo} alt='Inacapicon' />
                </div>
                
                <div className="w-full md:w-96 mb-6">
                    <div className='mb-4'>
                        <label for="x" className="block mb-2 font-semibold text-gray-900 text-base font-bold">Ingrese los valores de (x) separados por "-" <b className='text-red-600'>*</b></label>
                        <input type="text" onChange={(e) => setXInput(e.target.value)}  className='block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none' placeholder='Ejem: 1-2-3-4-5' />
                    </div>

                    <div className=''>
                        <label for="y" className="block mb-2 font-semibold text-gray-900 text-base font-bold">Ingrese los valores de (y) separados por "-" <b className='text-red-600'>*</b></label>
                        <input type="text" onChange={(e) => setYInput(e.target.value)}  className='block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none' placeholder='Ejem: 1-2-3-4-5' />
                    </div>
                    <p className='mt-2 text-sm text-gray-600'>Declarar decimales como (Ejem): 12.50</p>
                    <p className='mt-2 text-sm text-red-600'>{alert}</p>

                    <button type="submit" className="mt-5 text-white cursor-pointer bg-gray-700 transition hover:transition hover:bg-gray-800 focus:outline-none font-medium rounded-lg text-base w-full px-5 py-2.5 text-center">
                        {/* {
                            loading ? (
                                <div className="flex items-center justify-center">
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-8 h-8 text-blue-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : ( 'Analizar datos' )
                        } */}
                        Analizar datos
                    </button>
                </div>
            </form>

                {
                    recommend && (
                        <div id="alert-additional-content-1" className="md:w-96 w-full p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-gray-50" role="alert">
                            {
                                loading ? (
                                    <div className="flex items-center justify-center">
                                        <div role="status">
                                            <svg aria-hidden="true" className="w-8 h-8 text-blue-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center">
                                           
                                         
                                            <h3 className="text-base font-semibold">Renombrar variables</h3>

                                            <button onClick={CloseRecommendation} type="button" className="ms-auto transition hover:transition cursor-pointer -mx-1.5 -my-1.5 bg-blue-50 text-blue-800 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#alert-1" aria-label="Close">
                                                <span className="sr-only">Close</span>
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <div class="mt-2 mb-4 text-sm">
                                            
                                        </div>
                                        <div className="flex">
                                            <button onClick={CloseModal} type="button" className="text-white bg-blue-800 cursor-pointer transition hover:transition hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded text-sm px-3 py-1.5 me-2 text-center inline-flex items-center">
                                                Ver resultados
                                            </button>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    )
                }

            <style>
                {`
                    @keyframes bajar {
                        0% {
                            transform: translateY(-200rem);
                        }
                        100% {
                            transform: translateY(0);
                        }
                    }
                `}
            </style>

            {
                activateModal && (
                    <div className="w-full h-screen z-40 absolute bg-black/40 backdrop-blur-xs flex items-center justify-center p-2">
                        <div className='bg-white p-7 rounded-lg md:w-10/12 h-10/12 w-full  animate-[bajar_0.8s_ease-out_forwards]'>
                            <div className="flex items-center text-blue-800 mb-4">
                                <svg className="shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span className="sr-only">Info</span>
                                <h3 className="text-xl font-bold">Análisis Estadístico</h3>

                                <button onClick={CloseModal} type="button" className="ms-auto transition hover:transition cursor-pointer -mx-1.5 -my-1.5 bg-blue-50 text-blue-800 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#alert-1" aria-label="Close">
                                    <span className="sr-only">Close</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                </button>
                            </div>
                            {/* <div className="mt-2 mb-4 text-sm overflow-y-auto h-[40rem]"> */}
                            <div className="mt-2 mb-4 bg-white overflow-y-auto h-96 flex md:flex-row flex-col items-center justify-center">

                                    <div className="w-full h-full p-4 bg-white">
                                        <h2 className='text-lg font-bold mb-2 uppercase'>Tabla de datos</h2>
                                        <div className="relative overflow-x-auto mb-4">
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                                                <thead>
                                                    {/* <tr class="bg-white border-b">
                                                        <th scope="col" class="px-6 py-3" className="border border-gray-400 bg-gray-100 px-4 py-2 text-left">{'Requerimientos'} (X)</th>
                                                    </tr> */}
                                                </thead>
                                                <tbody>
                                                    <tr class="bg-white border-b">
                                                        <td scope="col" class="px-6 py-3" className="border font-bold border-gray-400 px-4 py-2">{'Requerimientos'} (X)</td>
                                                        {
                                                            xTable.map((x) => (
                                                                <td scope="col" class="px-6 py-3" className="border text-blue-600 border-gray-400 px-4 py-2">{x}</td>
                                                            ))
                                                        }
                                                    </tr>
                                                    <tr  class="bg-white">
                                                        <td scope="col" class="px-6 py-3" className="border font-bold border-gray-400 px-4 py-2">{'Ingresos'}(Y)</td>
                                                        {
                                                            yTable.map((y) => (
                                                                <td scope="col" class="px-6 py-3" className="border text-blue-600 border-gray-400 px-4 py-2">{y}</td>
                                                            ))
                                                        }
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <h2 className='text-lg font-bold mb-2 uppercase'>Resultados</h2>
                                        {
                                            regressionResults.map((item, index) => (
                                                <li key={index} className="mb-1">
                                                    <span className="font-semibold">{item.label}:</span> {item.value.toFixed(4)}
                                                </li>
                                            ))
                                        }
                                        <li className="mb-1">
                                            <span className="font-semibold">Modelo lineal: </span>y = {valueB}(x) + {valueA}
                                        </li>

                                        <div className="">
                                            y = {valueB}(<input className='w-8 p-1 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none' placeholder='x'></input>) + {valueA} = {}
                                        </div>
                                    </div>

                                    <div className="w-full h-full p-4">
                                        
                                    </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
};
export default FormData;