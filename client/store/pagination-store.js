'use client'
import {create} from 'zustand';

const usePaginationStore = create((set) => ({
  currentPage: 1, // Default value for currentPage
  totalPages:null,
  totalCampaigns:null,// Function to update currentPage
  setCurrentPage: (page) => set({ currentPage: page }), 
  setTotalPages: (tpage) => set({ totalPages: tpage }), 
  setTotalCampaigns: (c) => set({ totalCampaigns: c }), 
}));

export default usePaginationStore;
