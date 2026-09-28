import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function ProductExtendedInfo({ product }: { product: any }) {
  
  const healthBenefitsSection = (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Health Benefits</h3>
      {product.healthBenefitsData ? (
        <ul className="space-y-4">
          {product.healthBenefitsData.map((b: any, idx: number) => (
            <li key={idx} className="flex gap-4 text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
              <span className="text-accent mt-1 shrink-0">
                <CheckCircle className="w-6 h-6" />
              </span>
              <p><strong>{b.title}:</strong> {b.desc}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 leading-relaxed text-lg bg-gray-50 p-4 rounded-xl border border-gray-100">{product.healthBenefits}</p>
      )}
    </div>
  );

  const keyBenefitsSection = product.keyBenefits && (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Key Benefit Badges</h3>
      <div className="flex flex-wrap gap-2 sm:gap-4">
        {product.keyBenefits.map((b: string, idx: number) => (
          <span key={idx} className="bg-accent/10 text-accent font-semibold px-3 py-1.5 text-xs sm:px-5 sm:py-3 sm:text-sm rounded-full border border-accent/20 shadow-sm sm:shadow-none">
            {b}
          </span>
        ))}
      </div>
    </div>
  );

  const directionsSection = (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Directions for Use</h3>
      {product.directionsData ? (
        <ul className="space-y-4">
          {product.directionsData.map((d: any, idx: number) => (
            <li key={idx} className="text-gray-600 bg-gray-50 p-5 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
              <strong className="block text-gray-900 mb-1">{d.title}:</strong> {d.desc}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 leading-relaxed text-lg bg-gray-50 p-5 rounded-xl border border-gray-100">{product.directions}</p>
      )}
    </div>
  );

  const nutritionSection = (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Nutrition Information</h3>
      {product.nutritionInfo && (
        <div className="mb-6 text-gray-600 space-y-2 bg-blue-50/50 p-5 rounded-xl border border-blue-100">
          <p><strong>Serving Size:</strong> {product.nutritionInfo.servingSize}</p>
          <p><strong>Recommended Use:</strong> {product.nutritionInfo.recommendedUse}</p>
        </div>
      )}

      {product.nutritionTable ? (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
          <table className="w-full text-sm text-left bg-white">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-4 font-semibold text-gray-900">Nutritional Information</th>
                <th className="px-5 py-4 font-semibold text-gray-900 text-center">Per 100 g</th>
                <th className="px-5 py-4 font-semibold text-gray-900 text-center">Per Serving</th>
                <th className="px-5 py-4 font-semibold text-gray-900 text-center">% RDA*</th>
              </tr>
            </thead>
            <tbody>
              {product.nutritionTable.map((row: any, idx: number) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 transition-colors'}>
                  <td className="px-5 py-3 font-medium text-gray-800 border-t border-gray-100">{row.name}</td>
                  <td className="px-5 py-3 text-gray-600 text-center border-t border-gray-100">{row.per100}</td>
                  <td className="px-5 py-3 text-gray-600 text-center border-t border-gray-100">{row.perServing}</td>
                  <td className="px-5 py-3 text-gray-600 text-center border-t border-gray-100">{row.rda}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : product.nutrition && (
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-md">
          <table className="w-full text-sm text-left bg-white">
            <tbody>
              {Object.entries(product.nutrition).map(([key, value], idx) => (
                <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 transition-colors'}>
                  <td className="px-5 py-3 font-medium text-gray-800 border-t border-gray-100">{key}</td>
                  <td className="px-5 py-3 text-gray-600 text-right border-t border-gray-100 font-semibold">{value as React.ReactNode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const storageSection = (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Storage Instructions</h3>
      <p className="text-gray-600 leading-relaxed text-lg bg-yellow-50/50 p-5 rounded-xl border border-yellow-100">{product.storage}</p>
    </div>
  );

  const extraInfoSection = product.extraInfo && (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100 uppercase">{product.extraInfo.title}</h3>
      <p className="text-gray-600 leading-relaxed text-lg bg-indigo-50/50 p-5 rounded-xl border border-indigo-100">{product.extraInfo.desc}</p>
    </div>
  );

  return (
    <div className="mt-16 pt-16 pb-16 border-t border-gray-200">
      
      {/* --- DESKTOP VIEW (hidden lg:grid) --- */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="space-y-12">
          {healthBenefitsSection}
          {keyBenefitsSection}
          {directionsSection}
          {extraInfoSection}
        </div>
        {/* Right Column */}
        <div className="space-y-12">
          {nutritionSection}
          {storageSection}
        </div>
      </div>

      {/* --- MOBILE VIEW (flex col lg:hidden) --- */}
      <div className="flex flex-col space-y-12 lg:hidden">
        {nutritionSection}
        {directionsSection}
        {healthBenefitsSection}
        {keyBenefitsSection}
        {storageSection}
        {extraInfoSection}
      </div>

    </div>
  );
}
