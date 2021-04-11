import { CreateAppFunction } from '@vue/runtime-core';
export type PluginFunction<T> = (app: CreateAppFunction<Element>, options: T) => void;
export interface PluginObject<T> {
    install: PluginFunction<T>;
}