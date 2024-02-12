import { IInputs } from "./generated/ManifestTypes";
import { createRoot, Root } from 'react-dom/client';
export interface IComponentProps{
    context: ComponentFramework.Context<IInputs>;
    notifyOutputChanged: () => void;
}