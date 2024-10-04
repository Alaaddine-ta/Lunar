import { Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">LUNAR</h3>
            <p>Votre partenaire de confiance</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
            <p>+212 6 79 51 67 76</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Adresse</h3>
            <p>Casablanca, Maroc</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Suivez-nous</h3>
            <Link 
              href="https://www.instagram.com/lunar.modesty" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center hover:text-gray-300 transition-colors"
            >
              <Instagram className="mr-2" size={20} />
              Instagram
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} TABET -LUNAR- , Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}