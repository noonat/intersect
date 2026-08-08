export declare const EPSILON: number;
export declare function abs(value: number): number;
export declare function clamp(value: number, min: number, max: number): number;
export declare function sign(value: number): number;
export declare class Point {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    clone(): Point;
    normalize(): number;
}
type Collider = AABB | Circle;
export declare class Hit {
    collider: Collider;
    pos: Point;
    delta: Point;
    normal: Point;
    time: number;
    constructor(collider: Collider);
}
export declare class Sweep {
    hit: Hit | null;
    pos: Point;
    time: number;
    constructor();
}
export declare class AABB {
    pos: Point;
    half: Point;
    constructor(pos: Point, half: Point);
    intersectPoint(point: Point): Hit | null;
    intersectSegment(pos: Point, delta: Point, paddingX?: number, paddingY?: number): Hit | null;
    intersectAABB(box: AABB): Hit | null;
    sweepAABB(box: AABB, delta: Point): Sweep;
    intersectCircle(circle: Circle): Hit | null;
    sweepCircle(circle: Circle, delta: Point): Sweep;
    sweepInto(staticColliders: Collider[], delta: Point): Sweep;
}
export declare class Circle {
    pos: Point;
    radius: number;
    constructor(pos: Point, radius: number);
    intersectPoint(point: Point, padding?: number): Hit | null;
    intersectSegment(pos: Point, delta: Point, padding?: number): Hit | null;
    intersectCircle(circle: Circle): Hit | null;
    sweepCircle(circle: Circle, delta: Point): Sweep;
    intersectAABB(box: AABB): Hit | null;
    sweepAABB(box: AABB, delta: Point): Sweep;
    sweepInto(staticColliders: Collider[], delta: Point): Sweep;
}
export {};
