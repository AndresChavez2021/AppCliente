import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { ResiduosDeUsuario, categoriasUsadasPorUsuarios } from '../../Services/ClientService';

const screenWidth = Dimensions.get('window').width;

const dataLine = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const dataBar = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const dataPie = [
  {
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Beijing",
    population: 527612,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "New York",
    population: 8538000,
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

// Función para obtener los datos de la API
const fetchCategoriasUsadasPorUsuarios = async () => {
  try {
    const response = await categoriasUsadasPorUsuarios();
    console.log("RESPO VIEW ", response)
    return response;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

const fetchRecoleccionesPorCategoria = async () => {
  try {
    const response = await ResiduosDeUsuario();
    console.log("RESPO VIEW ", response)
    return response;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

const Graph = () => {

  const [dataLine, setDataLine] = useState({ labels: [], datasets: [{ data: [] }] });
  const [dataPie, setDataPie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Función para generar colores aleatorios
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const listCatUserPie = await fetchRecoleccionesPorCategoria();
        // Mapear los datos para el formato del PieChart
        const formattedData = listCatUserPie.map((item, index) => ({
          name: item.nombre,
          population: item.total,
          color: getRandomColor(),
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        }));

        setDataPie(formattedData);


        const listCatUser = await fetchCategoriasUsadasPorUsuarios();
        const categorias = listCatUser.map(item => item.nombre);
        const totalUsuarios = listCatUser.map(item => item.total);
        setDataLine({
          labels: categorias,
          datasets: [{ data: totalUsuarios }]
        });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{top:50}} />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  return (
    <ScrollView style={{ top: 50 }}>
      <View>
        <Text style={{ textAlign: 'center', fontSize: 18, margin: 10 }}>Gráfico de Categorías con mas recoleccion </Text>
        <LineChart
          data={dataLine}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>



      <View>
        <Text style={{ textAlign: 'center', fontSize: 18, margin: 10 }}>Mis Reciclados</Text>
        <PieChart
          data={dataPie}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View >
      <View
        style={{ marginBottom: 60 }}
      />
    </ScrollView>
  );
}

export default Graph;
