import React from 'react';
import { Package, CreditCard, RefreshCcw } from 'lucide-react';
import FeatureCard from './featureCard';

const SupportedBy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Nos Engagements pour Vous</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Package className="w-12 h-12" />}
          title="PAIEMENT À LA LIVRAISON"
          description="Payez directement à la réception de votre commande, disponible dans tout le Maroc"
        />
        <FeatureCard
          icon={<CreditCard className="w-12 h-12" />}
          title="SERVICE CLIENT"
          description="Notre service client est disponible pour répondre à toutes vos questions."
        />
        <FeatureCard
          icon={<RefreshCcw className="w-12 h-12" />}
          title="GARANTIE SATISFAIT OU REMBOURSÉ"
          description="Si vous n'êtes pas satisfait de votre achat, retournez vos vêtements sous 3 jours pour un échange ou un remboursement complet, sans poser de questions."
        />
        
      </div>
    </div>
  );
};

export default SupportedBy;
