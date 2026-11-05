import { describe, expect, test } from "vitest";
import { canTransition, isOrderStatus, nextStatuses } from "@/lib/orders";

describe("nextStatuses", () => {
	test("returns allowed statuses for pending", () => {
		expect(nextStatuses("pending")).toEqual(["preparing", "cancelled"]);
	});

	test("returns allowed statuses for preparing", () => {
		expect(nextStatuses("preparing")).toEqual(["ready", "cancelled"]);
	});

	test("returns allowed statuses for ready", () => {
		expect(nextStatuses("ready")).toEqual(["delivered"]);
	});

	test("returns no statuses for final states", () => {
		expect(nextStatuses("delivered")).toEqual([]);
		expect(nextStatuses("cancelled")).toEqual([]);
	});
});

describe("canTransition", () => {
	test("allows valid transitions", () => {
		expect(canTransition("pending", "preparing")).toBe(true);
		expect(canTransition("pending", "cancelled")).toBe(true);
		expect(canTransition("preparing", "ready")).toBe(true);
		expect(canTransition("preparing", "cancelled")).toBe(true);
		expect(canTransition("ready", "delivered")).toBe(true);
	});

	test("rejects invalid transitions", () => {
		expect(canTransition("pending", "delivered")).toBe(false);
		expect(canTransition("ready", "pending")).toBe(false);
		expect(canTransition("ready", "cancelled")).toBe(false);
		expect(canTransition("delivered", "pending")).toBe(false);
		expect(canTransition("cancelled", "preparing")).toBe(false);
	});
});

describe("isOrderStatus", () => {
	test("accepts valid statuses", () => {
		for (const status of [
			"pending",
			"preparing",
			"ready",
			"delivered",
			"cancelled",
		]) {
			expect(isOrderStatus(status)).toBe(true);
		}
	});

	test("rejects invalid values", () => {
		for (const value of ["shipped", "", "PENDING", 123, null, undefined, {}]) {
			expect(isOrderStatus(value)).toBe(false);
		}
	});
});
