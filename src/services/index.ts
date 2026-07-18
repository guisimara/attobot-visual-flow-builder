/**
 * Service factory. UI code should import `services` from here — never from a
 * specific implementation. Swap the export to plug in a real backend later.
 */

import { mockServices } from "./mock";
export type { Services } from "./contracts";

export const services = mockServices;
