import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, addClient, updateClient, deleteClient } from '../clientsSlice';

export const useClients = () => {
  const dispatch = useDispatch();
  const {
    clients,
    loading,
    error,
    selectedClient,
    filters
  } = useSelector((state) => state.clients);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    status: 'all',
    riskProfile: 'all',
    sortBy: 'name',
  });

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedFilters.status === 'all' || client.status === selectedFilters.status;
    const matchesRisk = selectedFilters.riskProfile === 'all' || client.riskProfile === selectedFilters.riskProfile;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const handleAddClient = (clientData) => {
    return dispatch(addClient(clientData));
  };

  const handleUpdateClient = (clientId, updates) => {
    return dispatch(updateClient({ id: clientId, updates }));
  };

  const handleDeleteClient = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      return dispatch(deleteClient(clientId));
    }
  };

  const getClientById = (clientId) => {
    return clients.find(client => client.id === clientId);
  };

  return {
    // Data
    clients: filteredClients,
    allClients: clients,
    selectedClient,
    
    // State
    loading,
    error,
    searchTerm,
    filters: selectedFilters,
    
    // Actions
    setSearchTerm,
    setFilters: setSelectedFilters,
    handleAddClient,
    handleUpdateClient,
    handleDeleteClient,
    getClientById,
    refreshClients: () => dispatch(fetchClients()),
  };
};