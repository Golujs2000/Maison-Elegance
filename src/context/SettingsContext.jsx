import React, { createContext, useContext, useState, useEffect } from "react";
import { getSettings, updateSettings } from "../services/settingsService";
import { INITIAL_SETTINGS } from "../data/initialData";
import toast from "react-hot-toast";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSettings();
        if (data) {
          setSettings(data);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const updateStoreSettings = async (newValues) => {
    try {
      const updated = await updateSettings(newValues);
      setSettings(updated);
      toast.success("Settings updated successfully!");
      return true;
    } catch (err) {
      toast.error("Failed to update settings");
      console.error(err);
      return false;
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateStoreSettings,
        loading,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
