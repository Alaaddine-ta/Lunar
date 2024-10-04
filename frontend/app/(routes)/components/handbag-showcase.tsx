import { ArrowRight } from 'lucide-react';

export default function HandbagShowcase() {
    return (
        <div className="bg-gray-100 p-8 flex justify-center items-center min-h-screen rounded-3xl">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <button className="px-4 py-2 bg-gray-300 rounded-full text-sm flex items-center gap-2 cursor-not-allowed">
                            Épuisé
                        </button>
                        <p className="text-left md:text-right max-w-xs text-sm text-gray-600">
                            Tous nos sacs se portent bien et compléteront magnifiquement votre vie et votre style.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <div className="w-full h-64 md:h-80 rounded-xl mb-4 relative overflow-hidden">
                                <img
                                    src="https://qmnrysxmrdvlfbshvnty.supabase.co/storage/v1/object/public/images/louis_vuitton.jpg"
                                    alt="Chelsea - Sac Sol"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Louis Vuitton</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Découvrez le luxe et la fonctionnalité avec notre sac à main Louis Vuitton, parfait pour toutes les occasions.
                            </p>
                        </div>

                        <div>
                            <div className="w-full h-64 md:h-80 rounded-xl mb-4 relative overflow-hidden">
                                <img
                                    src="https://qmnrysxmrdvlfbshvnty.supabase.co/storage/v1/object/public/images/michael_kors.jpg"
                                    alt="Chelsea - Sac Malibu"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Michael Kors</h3>
                            <button className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-2">
                                Coming soon <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}