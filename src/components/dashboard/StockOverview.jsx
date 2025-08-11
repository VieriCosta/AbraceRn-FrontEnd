import React, { useEffect, useState } from 'react';
import {
  useProducts,
  getCategoryOptions,
  getGenderOptions,
} from '../../contexts/ProductContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#A569BD',
  '#5DADE2',
];
const GENDER_COLORS = {
  MASCULINO: '#2c2cc7',
  FEMININO: '#ad83bd',
  UNISSEX: '#9090cf',
};

const getCategoryName = (value) => {
  const opt = getCategoryOptions().find(o => o.value === value);
  return opt ? opt.label : value;
};
const getGenderName = (value) => {
  const opt = getGenderOptions().find(o => o.value === value);
  return opt ? opt.label : value;
};

const StockOverview = () => {
  const { products } = useProducts();
  const [categoryData, setCategoryData] = useState([]);
  const [genderData, setGenderData] = useState([]);

  useEffect(() => {
    if (!products.length) return;

    // por categoria
    const catMap = {};
    products.forEach(p => {
      const name = getCategoryName(p.category);
      catMap[name] = (catMap[name] || 0) + p.quantity;
    });
    setCategoryData(
      Object.entries(catMap).map(([name, value]) => ({ name, value }))
    );

    // por gênero
    const genMap = {};
    products.forEach(p => {
      const name = getGenderName(p.gender).toUpperCase();
      genMap[name] = (genMap[name] || 0) + p.quantity;
    });
    setGenderData(
      Object.entries(genMap).map(([name, value]) => ({ name, value }))
    );
  }, [products]);

  const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);
  const lowStockCount = products.filter(
    p => p.quantity < p.minimumStock
  ).length;

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }) => {
    const RAD = Math.PI / 180;
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + r * Math.cos(-midAngle * RAD);
    const y = cy + r * Math.sin(-midAngle * RAD);
    return (
      <text
        x={x}
        y={y}
        className="fill-[#00000074] font-bold text-xs"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: 'Total de Produtos',
            value: products.length,
            subtitle: 'Tipos de produtos cadastrados',
          },
          {
            title: 'Quantidade em Estoque',
            value: totalQuantity,
            subtitle: 'Itens disponíveis',
          },
          {
            title: 'Alertas de Estoque',
            value: lowStockCount,
            subtitle: 'Produtos com estoque baixo',
            valueClass:
              lowStockCount > 0 ? 'text-destructive' : 'text-[#f68597]',
          },
        ].map((card, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.valueClass || ''}`}>
                {card.value}
              </div>
              <p className="text-xs text-muted-foreground">{card.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-[300px]">
          <CardHeader>
            <CardTitle>Estoque por Categoria</CardTitle>
          </CardHeader>
          <CardContent className="h-[230px]">
            {categoryData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    labelLine={false}
                    label={renderLabel}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={val => [`${val} unidades`, 'Quantidade']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Sem dados para exibir
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="h-[300px]">
          <CardHeader>
            <CardTitle>Estoque por Gênero</CardTitle>
          </CardHeader>
          <CardContent className="h-[230px]">
            {genderData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    labelLine={false}
                    label={renderLabel}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {genderData.map(entry => (
                      <Cell
                        key={entry.name}
                        fill={GENDER_COLORS[entry.name] || COLORS[0]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={val => [`${val} unidades`, 'Quantidade']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Sem dados para exibir
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockOverview;
