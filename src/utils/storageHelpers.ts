/**
 * Storage utilities for localStorage operations with TypeScript generic support
 */

import { logger } from './logger';

/**
 * Retrieves data from localStorage with type safety
 * @param key - The localStorage key to retrieve
 * @param defaultValue - The default value to return if key doesn't exist or parsing fails
 * @returns The parsed data of type T or the default value
 */
export const getLocalData = <T = unknown>(key: string, defaultValue: T = [] as T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    logger.error('Error parsing localStorage data', { key, error: error instanceof Error ? error.message : String(error) });
    return defaultValue;
  }
};

/**
 * Saves data to localStorage with JSON serialization
 * @param key - The localStorage key to save to
 * @param data - The data to save (will be JSON stringified)
 * @returns True if successful, false if an error occurred
 */
export const saveLocalData = (key: string, data: unknown): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    logger.error('Error saving to localStorage', { key, error: error instanceof Error ? error.message : String(error) });
    return false;
  }
};

/**
 * Removes a key from localStorage
 * @param key - The localStorage key to remove
 * @returns True if successful, false if an error occurred
 */
export const removeLocalData = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    logger.error('Error removing localStorage key', { key, error: error instanceof Error ? error.message : String(error) });
    return false;
  }
};

/**
 * Clears all localStorage data
 * @returns True if successful, false if an error occurred
 */
export const clearLocalData = (): boolean => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    logger.error('Error clearing localStorage', { error: error instanceof Error ? error.message : String(error) });
    return false;
  }
};