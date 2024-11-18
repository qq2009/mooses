import {HzVideoClient} from "./core/core";

interface Window {
    HzVideoClient: keyof HzVideoClient;
}
