
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model MultiplayerGame
 * 
 */
export type MultiplayerGame = $Result.DefaultSelection<Prisma.$MultiplayerGamePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const MultiplayerGameStatus: {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED'
};

export type MultiplayerGameStatus = (typeof MultiplayerGameStatus)[keyof typeof MultiplayerGameStatus]


export const MultiplayerPhase: {
  PICK_CATEGORY: 'PICK_CATEGORY',
  ANSWERING: 'ANSWERING'
};

export type MultiplayerPhase = (typeof MultiplayerPhase)[keyof typeof MultiplayerPhase]

}

export type MultiplayerGameStatus = $Enums.MultiplayerGameStatus

export const MultiplayerGameStatus: typeof $Enums.MultiplayerGameStatus

export type MultiplayerPhase = $Enums.MultiplayerPhase

export const MultiplayerPhase: typeof $Enums.MultiplayerPhase

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.multiplayerGame`: Exposes CRUD operations for the **MultiplayerGame** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MultiplayerGames
    * const multiplayerGames = await prisma.multiplayerGame.findMany()
    * ```
    */
  get multiplayerGame(): Prisma.MultiplayerGameDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    MultiplayerGame: 'MultiplayerGame'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "multiplayerGame"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      MultiplayerGame: {
        payload: Prisma.$MultiplayerGamePayload<ExtArgs>
        fields: Prisma.MultiplayerGameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MultiplayerGameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MultiplayerGameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload>
          }
          findFirst: {
            args: Prisma.MultiplayerGameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MultiplayerGameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload>
          }
          findMany: {
            args: Prisma.MultiplayerGameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload>[]
          }
          create: {
            args: Prisma.MultiplayerGameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload>
          }
          createMany: {
            args: Prisma.MultiplayerGameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MultiplayerGameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload>[]
          }
          delete: {
            args: Prisma.MultiplayerGameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload>
          }
          update: {
            args: Prisma.MultiplayerGameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload>
          }
          deleteMany: {
            args: Prisma.MultiplayerGameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MultiplayerGameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MultiplayerGameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload>[]
          }
          upsert: {
            args: Prisma.MultiplayerGameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload>
          }
          aggregate: {
            args: Prisma.MultiplayerGameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMultiplayerGame>
          }
          groupBy: {
            args: Prisma.MultiplayerGameGroupByArgs<ExtArgs>
            result: $Utils.Optional<MultiplayerGameGroupByOutputType>[]
          }
          count: {
            args: Prisma.MultiplayerGameCountArgs<ExtArgs>
            result: $Utils.Optional<MultiplayerGameCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    multiplayerGame?: MultiplayerGameOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    friends: number
    friendOf: number
    pendingFriends: number
    pendingFrom: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    friends?: boolean | UserCountOutputTypeCountFriendsArgs
    friendOf?: boolean | UserCountOutputTypeCountFriendOfArgs
    pendingFriends?: boolean | UserCountOutputTypeCountPendingFriendsArgs
    pendingFrom?: boolean | UserCountOutputTypeCountPendingFromArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPendingFriendsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPendingFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    score: number | null
  }

  export type UserSumAggregateOutputType = {
    score: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    isOnline: boolean | null
    clerkId: string | null
    score: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    isOnline: boolean | null
    clerkId: string | null
    score: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    isOnline: number
    clerkId: number
    score: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    score?: true
  }

  export type UserSumAggregateInputType = {
    score?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    isOnline?: true
    clerkId?: true
    score?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    isOnline?: true
    clerkId?: true
    score?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    isOnline?: true
    clerkId?: true
    score?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string | null
    isOnline: boolean
    clerkId: string | null
    score: number | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    isOnline?: boolean
    clerkId?: boolean
    score?: boolean
    friends?: boolean | User$friendsArgs<ExtArgs>
    friendOf?: boolean | User$friendOfArgs<ExtArgs>
    pendingFriends?: boolean | User$pendingFriendsArgs<ExtArgs>
    pendingFrom?: boolean | User$pendingFromArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    isOnline?: boolean
    clerkId?: boolean
    score?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    isOnline?: boolean
    clerkId?: boolean
    score?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    isOnline?: boolean
    clerkId?: boolean
    score?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "isOnline" | "clerkId" | "score", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    friends?: boolean | User$friendsArgs<ExtArgs>
    friendOf?: boolean | User$friendOfArgs<ExtArgs>
    pendingFriends?: boolean | User$pendingFriendsArgs<ExtArgs>
    pendingFrom?: boolean | User$pendingFromArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      friends: Prisma.$UserPayload<ExtArgs>[]
      friendOf: Prisma.$UserPayload<ExtArgs>[]
      pendingFriends: Prisma.$UserPayload<ExtArgs>[]
      pendingFrom: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string | null
      isOnline: boolean
      clerkId: string | null
      score: number | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    friends<T extends User$friendsArgs<ExtArgs> = {}>(args?: Subset<T, User$friendsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friendOf<T extends User$friendOfArgs<ExtArgs> = {}>(args?: Subset<T, User$friendOfArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pendingFriends<T extends User$pendingFriendsArgs<ExtArgs> = {}>(args?: Subset<T, User$pendingFriendsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pendingFrom<T extends User$pendingFromArgs<ExtArgs> = {}>(args?: Subset<T, User$pendingFromArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly isOnline: FieldRef<"User", 'Boolean'>
    readonly clerkId: FieldRef<"User", 'String'>
    readonly score: FieldRef<"User", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data?: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.friends
   */
  export type User$friendsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.friendOf
   */
  export type User$friendOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.pendingFriends
   */
  export type User$pendingFriendsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.pendingFrom
   */
  export type User$pendingFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model MultiplayerGame
   */

  export type AggregateMultiplayerGame = {
    _count: MultiplayerGameCountAggregateOutputType | null
    _avg: MultiplayerGameAvgAggregateOutputType | null
    _sum: MultiplayerGameSumAggregateOutputType | null
    _min: MultiplayerGameMinAggregateOutputType | null
    _max: MultiplayerGameMaxAggregateOutputType | null
  }

  export type MultiplayerGameAvgAggregateOutputType = {
    currentQuestionIndex: number | null
    player1Score: number | null
    player2Score: number | null
    completedTurns: number | null
    totalTurns: number | null
  }

  export type MultiplayerGameSumAggregateOutputType = {
    currentQuestionIndex: number | null
    player1Score: number | null
    player2Score: number | null
    completedTurns: number | null
    totalTurns: number | null
  }

  export type MultiplayerGameMinAggregateOutputType = {
    id: string | null
    status: $Enums.MultiplayerGameStatus | null
    phase: $Enums.MultiplayerPhase | null
    difficulty: string | null
    player1ClerkId: string | null
    player1Username: string | null
    player2ClerkId: string | null
    player2Username: string | null
    currentTurnClerkId: string | null
    answeringPlayerClerkId: string | null
    currentCategory: string | null
    currentQuestionIndex: number | null
    player1Score: number | null
    player2Score: number | null
    completedTurns: number | null
    totalTurns: number | null
    activePairKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MultiplayerGameMaxAggregateOutputType = {
    id: string | null
    status: $Enums.MultiplayerGameStatus | null
    phase: $Enums.MultiplayerPhase | null
    difficulty: string | null
    player1ClerkId: string | null
    player1Username: string | null
    player2ClerkId: string | null
    player2Username: string | null
    currentTurnClerkId: string | null
    answeringPlayerClerkId: string | null
    currentCategory: string | null
    currentQuestionIndex: number | null
    player1Score: number | null
    player2Score: number | null
    completedTurns: number | null
    totalTurns: number | null
    activePairKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MultiplayerGameCountAggregateOutputType = {
    id: number
    status: number
    phase: number
    difficulty: number
    player1ClerkId: number
    player1Username: number
    player2ClerkId: number
    player2Username: number
    currentTurnClerkId: number
    answeringPlayerClerkId: number
    currentCategory: number
    currentQuestions: number
    currentQuestionIndex: number
    player1Score: number
    player2Score: number
    completedTurns: number
    totalTurns: number
    activePairKey: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MultiplayerGameAvgAggregateInputType = {
    currentQuestionIndex?: true
    player1Score?: true
    player2Score?: true
    completedTurns?: true
    totalTurns?: true
  }

  export type MultiplayerGameSumAggregateInputType = {
    currentQuestionIndex?: true
    player1Score?: true
    player2Score?: true
    completedTurns?: true
    totalTurns?: true
  }

  export type MultiplayerGameMinAggregateInputType = {
    id?: true
    status?: true
    phase?: true
    difficulty?: true
    player1ClerkId?: true
    player1Username?: true
    player2ClerkId?: true
    player2Username?: true
    currentTurnClerkId?: true
    answeringPlayerClerkId?: true
    currentCategory?: true
    currentQuestionIndex?: true
    player1Score?: true
    player2Score?: true
    completedTurns?: true
    totalTurns?: true
    activePairKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MultiplayerGameMaxAggregateInputType = {
    id?: true
    status?: true
    phase?: true
    difficulty?: true
    player1ClerkId?: true
    player1Username?: true
    player2ClerkId?: true
    player2Username?: true
    currentTurnClerkId?: true
    answeringPlayerClerkId?: true
    currentCategory?: true
    currentQuestionIndex?: true
    player1Score?: true
    player2Score?: true
    completedTurns?: true
    totalTurns?: true
    activePairKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MultiplayerGameCountAggregateInputType = {
    id?: true
    status?: true
    phase?: true
    difficulty?: true
    player1ClerkId?: true
    player1Username?: true
    player2ClerkId?: true
    player2Username?: true
    currentTurnClerkId?: true
    answeringPlayerClerkId?: true
    currentCategory?: true
    currentQuestions?: true
    currentQuestionIndex?: true
    player1Score?: true
    player2Score?: true
    completedTurns?: true
    totalTurns?: true
    activePairKey?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MultiplayerGameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MultiplayerGame to aggregate.
     */
    where?: MultiplayerGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MultiplayerGames to fetch.
     */
    orderBy?: MultiplayerGameOrderByWithRelationInput | MultiplayerGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MultiplayerGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MultiplayerGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MultiplayerGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MultiplayerGames
    **/
    _count?: true | MultiplayerGameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MultiplayerGameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MultiplayerGameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MultiplayerGameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MultiplayerGameMaxAggregateInputType
  }

  export type GetMultiplayerGameAggregateType<T extends MultiplayerGameAggregateArgs> = {
        [P in keyof T & keyof AggregateMultiplayerGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMultiplayerGame[P]>
      : GetScalarType<T[P], AggregateMultiplayerGame[P]>
  }




  export type MultiplayerGameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MultiplayerGameWhereInput
    orderBy?: MultiplayerGameOrderByWithAggregationInput | MultiplayerGameOrderByWithAggregationInput[]
    by: MultiplayerGameScalarFieldEnum[] | MultiplayerGameScalarFieldEnum
    having?: MultiplayerGameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MultiplayerGameCountAggregateInputType | true
    _avg?: MultiplayerGameAvgAggregateInputType
    _sum?: MultiplayerGameSumAggregateInputType
    _min?: MultiplayerGameMinAggregateInputType
    _max?: MultiplayerGameMaxAggregateInputType
  }

  export type MultiplayerGameGroupByOutputType = {
    id: string
    status: $Enums.MultiplayerGameStatus
    phase: $Enums.MultiplayerPhase
    difficulty: string
    player1ClerkId: string
    player1Username: string
    player2ClerkId: string
    player2Username: string
    currentTurnClerkId: string | null
    answeringPlayerClerkId: string | null
    currentCategory: string | null
    currentQuestions: JsonValue | null
    currentQuestionIndex: number
    player1Score: number
    player2Score: number
    completedTurns: number
    totalTurns: number
    activePairKey: string | null
    createdAt: Date
    updatedAt: Date
    _count: MultiplayerGameCountAggregateOutputType | null
    _avg: MultiplayerGameAvgAggregateOutputType | null
    _sum: MultiplayerGameSumAggregateOutputType | null
    _min: MultiplayerGameMinAggregateOutputType | null
    _max: MultiplayerGameMaxAggregateOutputType | null
  }

  type GetMultiplayerGameGroupByPayload<T extends MultiplayerGameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MultiplayerGameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MultiplayerGameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MultiplayerGameGroupByOutputType[P]>
            : GetScalarType<T[P], MultiplayerGameGroupByOutputType[P]>
        }
      >
    >


  export type MultiplayerGameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    phase?: boolean
    difficulty?: boolean
    player1ClerkId?: boolean
    player1Username?: boolean
    player2ClerkId?: boolean
    player2Username?: boolean
    currentTurnClerkId?: boolean
    answeringPlayerClerkId?: boolean
    currentCategory?: boolean
    currentQuestions?: boolean
    currentQuestionIndex?: boolean
    player1Score?: boolean
    player2Score?: boolean
    completedTurns?: boolean
    totalTurns?: boolean
    activePairKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["multiplayerGame"]>

  export type MultiplayerGameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    phase?: boolean
    difficulty?: boolean
    player1ClerkId?: boolean
    player1Username?: boolean
    player2ClerkId?: boolean
    player2Username?: boolean
    currentTurnClerkId?: boolean
    answeringPlayerClerkId?: boolean
    currentCategory?: boolean
    currentQuestions?: boolean
    currentQuestionIndex?: boolean
    player1Score?: boolean
    player2Score?: boolean
    completedTurns?: boolean
    totalTurns?: boolean
    activePairKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["multiplayerGame"]>

  export type MultiplayerGameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    phase?: boolean
    difficulty?: boolean
    player1ClerkId?: boolean
    player1Username?: boolean
    player2ClerkId?: boolean
    player2Username?: boolean
    currentTurnClerkId?: boolean
    answeringPlayerClerkId?: boolean
    currentCategory?: boolean
    currentQuestions?: boolean
    currentQuestionIndex?: boolean
    player1Score?: boolean
    player2Score?: boolean
    completedTurns?: boolean
    totalTurns?: boolean
    activePairKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["multiplayerGame"]>

  export type MultiplayerGameSelectScalar = {
    id?: boolean
    status?: boolean
    phase?: boolean
    difficulty?: boolean
    player1ClerkId?: boolean
    player1Username?: boolean
    player2ClerkId?: boolean
    player2Username?: boolean
    currentTurnClerkId?: boolean
    answeringPlayerClerkId?: boolean
    currentCategory?: boolean
    currentQuestions?: boolean
    currentQuestionIndex?: boolean
    player1Score?: boolean
    player2Score?: boolean
    completedTurns?: boolean
    totalTurns?: boolean
    activePairKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MultiplayerGameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "status" | "phase" | "difficulty" | "player1ClerkId" | "player1Username" | "player2ClerkId" | "player2Username" | "currentTurnClerkId" | "answeringPlayerClerkId" | "currentCategory" | "currentQuestions" | "currentQuestionIndex" | "player1Score" | "player2Score" | "completedTurns" | "totalTurns" | "activePairKey" | "createdAt" | "updatedAt", ExtArgs["result"]["multiplayerGame"]>

  export type $MultiplayerGamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MultiplayerGame"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: $Enums.MultiplayerGameStatus
      phase: $Enums.MultiplayerPhase
      difficulty: string
      player1ClerkId: string
      player1Username: string
      player2ClerkId: string
      player2Username: string
      currentTurnClerkId: string | null
      answeringPlayerClerkId: string | null
      currentCategory: string | null
      currentQuestions: Prisma.JsonValue | null
      currentQuestionIndex: number
      player1Score: number
      player2Score: number
      completedTurns: number
      totalTurns: number
      activePairKey: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["multiplayerGame"]>
    composites: {}
  }

  type MultiplayerGameGetPayload<S extends boolean | null | undefined | MultiplayerGameDefaultArgs> = $Result.GetResult<Prisma.$MultiplayerGamePayload, S>

  type MultiplayerGameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MultiplayerGameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MultiplayerGameCountAggregateInputType | true
    }

  export interface MultiplayerGameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MultiplayerGame'], meta: { name: 'MultiplayerGame' } }
    /**
     * Find zero or one MultiplayerGame that matches the filter.
     * @param {MultiplayerGameFindUniqueArgs} args - Arguments to find a MultiplayerGame
     * @example
     * // Get one MultiplayerGame
     * const multiplayerGame = await prisma.multiplayerGame.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MultiplayerGameFindUniqueArgs>(args: SelectSubset<T, MultiplayerGameFindUniqueArgs<ExtArgs>>): Prisma__MultiplayerGameClient<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MultiplayerGame that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MultiplayerGameFindUniqueOrThrowArgs} args - Arguments to find a MultiplayerGame
     * @example
     * // Get one MultiplayerGame
     * const multiplayerGame = await prisma.multiplayerGame.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MultiplayerGameFindUniqueOrThrowArgs>(args: SelectSubset<T, MultiplayerGameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MultiplayerGameClient<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MultiplayerGame that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerGameFindFirstArgs} args - Arguments to find a MultiplayerGame
     * @example
     * // Get one MultiplayerGame
     * const multiplayerGame = await prisma.multiplayerGame.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MultiplayerGameFindFirstArgs>(args?: SelectSubset<T, MultiplayerGameFindFirstArgs<ExtArgs>>): Prisma__MultiplayerGameClient<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MultiplayerGame that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerGameFindFirstOrThrowArgs} args - Arguments to find a MultiplayerGame
     * @example
     * // Get one MultiplayerGame
     * const multiplayerGame = await prisma.multiplayerGame.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MultiplayerGameFindFirstOrThrowArgs>(args?: SelectSubset<T, MultiplayerGameFindFirstOrThrowArgs<ExtArgs>>): Prisma__MultiplayerGameClient<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MultiplayerGames that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerGameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MultiplayerGames
     * const multiplayerGames = await prisma.multiplayerGame.findMany()
     * 
     * // Get first 10 MultiplayerGames
     * const multiplayerGames = await prisma.multiplayerGame.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const multiplayerGameWithIdOnly = await prisma.multiplayerGame.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MultiplayerGameFindManyArgs>(args?: SelectSubset<T, MultiplayerGameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MultiplayerGame.
     * @param {MultiplayerGameCreateArgs} args - Arguments to create a MultiplayerGame.
     * @example
     * // Create one MultiplayerGame
     * const MultiplayerGame = await prisma.multiplayerGame.create({
     *   data: {
     *     // ... data to create a MultiplayerGame
     *   }
     * })
     * 
     */
    create<T extends MultiplayerGameCreateArgs>(args: SelectSubset<T, MultiplayerGameCreateArgs<ExtArgs>>): Prisma__MultiplayerGameClient<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MultiplayerGames.
     * @param {MultiplayerGameCreateManyArgs} args - Arguments to create many MultiplayerGames.
     * @example
     * // Create many MultiplayerGames
     * const multiplayerGame = await prisma.multiplayerGame.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MultiplayerGameCreateManyArgs>(args?: SelectSubset<T, MultiplayerGameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MultiplayerGames and returns the data saved in the database.
     * @param {MultiplayerGameCreateManyAndReturnArgs} args - Arguments to create many MultiplayerGames.
     * @example
     * // Create many MultiplayerGames
     * const multiplayerGame = await prisma.multiplayerGame.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MultiplayerGames and only return the `id`
     * const multiplayerGameWithIdOnly = await prisma.multiplayerGame.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MultiplayerGameCreateManyAndReturnArgs>(args?: SelectSubset<T, MultiplayerGameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MultiplayerGame.
     * @param {MultiplayerGameDeleteArgs} args - Arguments to delete one MultiplayerGame.
     * @example
     * // Delete one MultiplayerGame
     * const MultiplayerGame = await prisma.multiplayerGame.delete({
     *   where: {
     *     // ... filter to delete one MultiplayerGame
     *   }
     * })
     * 
     */
    delete<T extends MultiplayerGameDeleteArgs>(args: SelectSubset<T, MultiplayerGameDeleteArgs<ExtArgs>>): Prisma__MultiplayerGameClient<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MultiplayerGame.
     * @param {MultiplayerGameUpdateArgs} args - Arguments to update one MultiplayerGame.
     * @example
     * // Update one MultiplayerGame
     * const multiplayerGame = await prisma.multiplayerGame.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MultiplayerGameUpdateArgs>(args: SelectSubset<T, MultiplayerGameUpdateArgs<ExtArgs>>): Prisma__MultiplayerGameClient<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MultiplayerGames.
     * @param {MultiplayerGameDeleteManyArgs} args - Arguments to filter MultiplayerGames to delete.
     * @example
     * // Delete a few MultiplayerGames
     * const { count } = await prisma.multiplayerGame.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MultiplayerGameDeleteManyArgs>(args?: SelectSubset<T, MultiplayerGameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MultiplayerGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerGameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MultiplayerGames
     * const multiplayerGame = await prisma.multiplayerGame.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MultiplayerGameUpdateManyArgs>(args: SelectSubset<T, MultiplayerGameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MultiplayerGames and returns the data updated in the database.
     * @param {MultiplayerGameUpdateManyAndReturnArgs} args - Arguments to update many MultiplayerGames.
     * @example
     * // Update many MultiplayerGames
     * const multiplayerGame = await prisma.multiplayerGame.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MultiplayerGames and only return the `id`
     * const multiplayerGameWithIdOnly = await prisma.multiplayerGame.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MultiplayerGameUpdateManyAndReturnArgs>(args: SelectSubset<T, MultiplayerGameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MultiplayerGame.
     * @param {MultiplayerGameUpsertArgs} args - Arguments to update or create a MultiplayerGame.
     * @example
     * // Update or create a MultiplayerGame
     * const multiplayerGame = await prisma.multiplayerGame.upsert({
     *   create: {
     *     // ... data to create a MultiplayerGame
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MultiplayerGame we want to update
     *   }
     * })
     */
    upsert<T extends MultiplayerGameUpsertArgs>(args: SelectSubset<T, MultiplayerGameUpsertArgs<ExtArgs>>): Prisma__MultiplayerGameClient<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MultiplayerGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerGameCountArgs} args - Arguments to filter MultiplayerGames to count.
     * @example
     * // Count the number of MultiplayerGames
     * const count = await prisma.multiplayerGame.count({
     *   where: {
     *     // ... the filter for the MultiplayerGames we want to count
     *   }
     * })
    **/
    count<T extends MultiplayerGameCountArgs>(
      args?: Subset<T, MultiplayerGameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MultiplayerGameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MultiplayerGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerGameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MultiplayerGameAggregateArgs>(args: Subset<T, MultiplayerGameAggregateArgs>): Prisma.PrismaPromise<GetMultiplayerGameAggregateType<T>>

    /**
     * Group by MultiplayerGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerGameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MultiplayerGameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MultiplayerGameGroupByArgs['orderBy'] }
        : { orderBy?: MultiplayerGameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MultiplayerGameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMultiplayerGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MultiplayerGame model
   */
  readonly fields: MultiplayerGameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MultiplayerGame.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MultiplayerGameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MultiplayerGame model
   */
  interface MultiplayerGameFieldRefs {
    readonly id: FieldRef<"MultiplayerGame", 'String'>
    readonly status: FieldRef<"MultiplayerGame", 'MultiplayerGameStatus'>
    readonly phase: FieldRef<"MultiplayerGame", 'MultiplayerPhase'>
    readonly difficulty: FieldRef<"MultiplayerGame", 'String'>
    readonly player1ClerkId: FieldRef<"MultiplayerGame", 'String'>
    readonly player1Username: FieldRef<"MultiplayerGame", 'String'>
    readonly player2ClerkId: FieldRef<"MultiplayerGame", 'String'>
    readonly player2Username: FieldRef<"MultiplayerGame", 'String'>
    readonly currentTurnClerkId: FieldRef<"MultiplayerGame", 'String'>
    readonly answeringPlayerClerkId: FieldRef<"MultiplayerGame", 'String'>
    readonly currentCategory: FieldRef<"MultiplayerGame", 'String'>
    readonly currentQuestions: FieldRef<"MultiplayerGame", 'Json'>
    readonly currentQuestionIndex: FieldRef<"MultiplayerGame", 'Int'>
    readonly player1Score: FieldRef<"MultiplayerGame", 'Int'>
    readonly player2Score: FieldRef<"MultiplayerGame", 'Int'>
    readonly completedTurns: FieldRef<"MultiplayerGame", 'Int'>
    readonly totalTurns: FieldRef<"MultiplayerGame", 'Int'>
    readonly activePairKey: FieldRef<"MultiplayerGame", 'String'>
    readonly createdAt: FieldRef<"MultiplayerGame", 'DateTime'>
    readonly updatedAt: FieldRef<"MultiplayerGame", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MultiplayerGame findUnique
   */
  export type MultiplayerGameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * Filter, which MultiplayerGame to fetch.
     */
    where: MultiplayerGameWhereUniqueInput
  }

  /**
   * MultiplayerGame findUniqueOrThrow
   */
  export type MultiplayerGameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * Filter, which MultiplayerGame to fetch.
     */
    where: MultiplayerGameWhereUniqueInput
  }

  /**
   * MultiplayerGame findFirst
   */
  export type MultiplayerGameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * Filter, which MultiplayerGame to fetch.
     */
    where?: MultiplayerGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MultiplayerGames to fetch.
     */
    orderBy?: MultiplayerGameOrderByWithRelationInput | MultiplayerGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MultiplayerGames.
     */
    cursor?: MultiplayerGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MultiplayerGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MultiplayerGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MultiplayerGames.
     */
    distinct?: MultiplayerGameScalarFieldEnum | MultiplayerGameScalarFieldEnum[]
  }

  /**
   * MultiplayerGame findFirstOrThrow
   */
  export type MultiplayerGameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * Filter, which MultiplayerGame to fetch.
     */
    where?: MultiplayerGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MultiplayerGames to fetch.
     */
    orderBy?: MultiplayerGameOrderByWithRelationInput | MultiplayerGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MultiplayerGames.
     */
    cursor?: MultiplayerGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MultiplayerGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MultiplayerGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MultiplayerGames.
     */
    distinct?: MultiplayerGameScalarFieldEnum | MultiplayerGameScalarFieldEnum[]
  }

  /**
   * MultiplayerGame findMany
   */
  export type MultiplayerGameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * Filter, which MultiplayerGames to fetch.
     */
    where?: MultiplayerGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MultiplayerGames to fetch.
     */
    orderBy?: MultiplayerGameOrderByWithRelationInput | MultiplayerGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MultiplayerGames.
     */
    cursor?: MultiplayerGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MultiplayerGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MultiplayerGames.
     */
    skip?: number
    distinct?: MultiplayerGameScalarFieldEnum | MultiplayerGameScalarFieldEnum[]
  }

  /**
   * MultiplayerGame create
   */
  export type MultiplayerGameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * The data needed to create a MultiplayerGame.
     */
    data: XOR<MultiplayerGameCreateInput, MultiplayerGameUncheckedCreateInput>
  }

  /**
   * MultiplayerGame createMany
   */
  export type MultiplayerGameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MultiplayerGames.
     */
    data: MultiplayerGameCreateManyInput | MultiplayerGameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MultiplayerGame createManyAndReturn
   */
  export type MultiplayerGameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * The data used to create many MultiplayerGames.
     */
    data: MultiplayerGameCreateManyInput | MultiplayerGameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MultiplayerGame update
   */
  export type MultiplayerGameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * The data needed to update a MultiplayerGame.
     */
    data: XOR<MultiplayerGameUpdateInput, MultiplayerGameUncheckedUpdateInput>
    /**
     * Choose, which MultiplayerGame to update.
     */
    where: MultiplayerGameWhereUniqueInput
  }

  /**
   * MultiplayerGame updateMany
   */
  export type MultiplayerGameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MultiplayerGames.
     */
    data: XOR<MultiplayerGameUpdateManyMutationInput, MultiplayerGameUncheckedUpdateManyInput>
    /**
     * Filter which MultiplayerGames to update
     */
    where?: MultiplayerGameWhereInput
    /**
     * Limit how many MultiplayerGames to update.
     */
    limit?: number
  }

  /**
   * MultiplayerGame updateManyAndReturn
   */
  export type MultiplayerGameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * The data used to update MultiplayerGames.
     */
    data: XOR<MultiplayerGameUpdateManyMutationInput, MultiplayerGameUncheckedUpdateManyInput>
    /**
     * Filter which MultiplayerGames to update
     */
    where?: MultiplayerGameWhereInput
    /**
     * Limit how many MultiplayerGames to update.
     */
    limit?: number
  }

  /**
   * MultiplayerGame upsert
   */
  export type MultiplayerGameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * The filter to search for the MultiplayerGame to update in case it exists.
     */
    where: MultiplayerGameWhereUniqueInput
    /**
     * In case the MultiplayerGame found by the `where` argument doesn't exist, create a new MultiplayerGame with this data.
     */
    create: XOR<MultiplayerGameCreateInput, MultiplayerGameUncheckedCreateInput>
    /**
     * In case the MultiplayerGame was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MultiplayerGameUpdateInput, MultiplayerGameUncheckedUpdateInput>
  }

  /**
   * MultiplayerGame delete
   */
  export type MultiplayerGameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * Filter which MultiplayerGame to delete.
     */
    where: MultiplayerGameWhereUniqueInput
  }

  /**
   * MultiplayerGame deleteMany
   */
  export type MultiplayerGameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MultiplayerGames to delete
     */
    where?: MultiplayerGameWhereInput
    /**
     * Limit how many MultiplayerGames to delete.
     */
    limit?: number
  }

  /**
   * MultiplayerGame without action
   */
  export type MultiplayerGameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    isOnline: 'isOnline',
    clerkId: 'clerkId',
    score: 'score'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MultiplayerGameScalarFieldEnum: {
    id: 'id',
    status: 'status',
    phase: 'phase',
    difficulty: 'difficulty',
    player1ClerkId: 'player1ClerkId',
    player1Username: 'player1Username',
    player2ClerkId: 'player2ClerkId',
    player2Username: 'player2Username',
    currentTurnClerkId: 'currentTurnClerkId',
    answeringPlayerClerkId: 'answeringPlayerClerkId',
    currentCategory: 'currentCategory',
    currentQuestions: 'currentQuestions',
    currentQuestionIndex: 'currentQuestionIndex',
    player1Score: 'player1Score',
    player2Score: 'player2Score',
    completedTurns: 'completedTurns',
    totalTurns: 'totalTurns',
    activePairKey: 'activePairKey',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MultiplayerGameScalarFieldEnum = (typeof MultiplayerGameScalarFieldEnum)[keyof typeof MultiplayerGameScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'MultiplayerGameStatus'
   */
  export type EnumMultiplayerGameStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MultiplayerGameStatus'>
    


  /**
   * Reference to a field of type 'MultiplayerGameStatus[]'
   */
  export type ListEnumMultiplayerGameStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MultiplayerGameStatus[]'>
    


  /**
   * Reference to a field of type 'MultiplayerPhase'
   */
  export type EnumMultiplayerPhaseFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MultiplayerPhase'>
    


  /**
   * Reference to a field of type 'MultiplayerPhase[]'
   */
  export type ListEnumMultiplayerPhaseFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MultiplayerPhase[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringNullableFilter<"User"> | string | null
    isOnline?: BoolFilter<"User"> | boolean
    clerkId?: StringNullableFilter<"User"> | string | null
    score?: IntNullableFilter<"User"> | number | null
    friends?: UserListRelationFilter
    friendOf?: UserListRelationFilter
    pendingFriends?: UserListRelationFilter
    pendingFrom?: UserListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrderInput | SortOrder
    isOnline?: SortOrder
    clerkId?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    friends?: UserOrderByRelationAggregateInput
    friendOf?: UserOrderByRelationAggregateInput
    pendingFriends?: UserOrderByRelationAggregateInput
    pendingFrom?: UserOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    clerkId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    isOnline?: BoolFilter<"User"> | boolean
    score?: IntNullableFilter<"User"> | number | null
    friends?: UserListRelationFilter
    friendOf?: UserListRelationFilter
    pendingFriends?: UserListRelationFilter
    pendingFrom?: UserListRelationFilter
  }, "id" | "username" | "clerkId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrderInput | SortOrder
    isOnline?: SortOrder
    clerkId?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    isOnline?: BoolWithAggregatesFilter<"User"> | boolean
    clerkId?: StringNullableWithAggregatesFilter<"User"> | string | null
    score?: IntNullableWithAggregatesFilter<"User"> | number | null
  }

  export type MultiplayerGameWhereInput = {
    AND?: MultiplayerGameWhereInput | MultiplayerGameWhereInput[]
    OR?: MultiplayerGameWhereInput[]
    NOT?: MultiplayerGameWhereInput | MultiplayerGameWhereInput[]
    id?: StringFilter<"MultiplayerGame"> | string
    status?: EnumMultiplayerGameStatusFilter<"MultiplayerGame"> | $Enums.MultiplayerGameStatus
    phase?: EnumMultiplayerPhaseFilter<"MultiplayerGame"> | $Enums.MultiplayerPhase
    difficulty?: StringFilter<"MultiplayerGame"> | string
    player1ClerkId?: StringFilter<"MultiplayerGame"> | string
    player1Username?: StringFilter<"MultiplayerGame"> | string
    player2ClerkId?: StringFilter<"MultiplayerGame"> | string
    player2Username?: StringFilter<"MultiplayerGame"> | string
    currentTurnClerkId?: StringNullableFilter<"MultiplayerGame"> | string | null
    answeringPlayerClerkId?: StringNullableFilter<"MultiplayerGame"> | string | null
    currentCategory?: StringNullableFilter<"MultiplayerGame"> | string | null
    currentQuestions?: JsonNullableFilter<"MultiplayerGame">
    currentQuestionIndex?: IntFilter<"MultiplayerGame"> | number
    player1Score?: IntFilter<"MultiplayerGame"> | number
    player2Score?: IntFilter<"MultiplayerGame"> | number
    completedTurns?: IntFilter<"MultiplayerGame"> | number
    totalTurns?: IntFilter<"MultiplayerGame"> | number
    activePairKey?: StringNullableFilter<"MultiplayerGame"> | string | null
    createdAt?: DateTimeFilter<"MultiplayerGame"> | Date | string
    updatedAt?: DateTimeFilter<"MultiplayerGame"> | Date | string
  }

  export type MultiplayerGameOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    phase?: SortOrder
    difficulty?: SortOrder
    player1ClerkId?: SortOrder
    player1Username?: SortOrder
    player2ClerkId?: SortOrder
    player2Username?: SortOrder
    currentTurnClerkId?: SortOrderInput | SortOrder
    answeringPlayerClerkId?: SortOrderInput | SortOrder
    currentCategory?: SortOrderInput | SortOrder
    currentQuestions?: SortOrderInput | SortOrder
    currentQuestionIndex?: SortOrder
    player1Score?: SortOrder
    player2Score?: SortOrder
    completedTurns?: SortOrder
    totalTurns?: SortOrder
    activePairKey?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MultiplayerGameWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    activePairKey?: string
    AND?: MultiplayerGameWhereInput | MultiplayerGameWhereInput[]
    OR?: MultiplayerGameWhereInput[]
    NOT?: MultiplayerGameWhereInput | MultiplayerGameWhereInput[]
    status?: EnumMultiplayerGameStatusFilter<"MultiplayerGame"> | $Enums.MultiplayerGameStatus
    phase?: EnumMultiplayerPhaseFilter<"MultiplayerGame"> | $Enums.MultiplayerPhase
    difficulty?: StringFilter<"MultiplayerGame"> | string
    player1ClerkId?: StringFilter<"MultiplayerGame"> | string
    player1Username?: StringFilter<"MultiplayerGame"> | string
    player2ClerkId?: StringFilter<"MultiplayerGame"> | string
    player2Username?: StringFilter<"MultiplayerGame"> | string
    currentTurnClerkId?: StringNullableFilter<"MultiplayerGame"> | string | null
    answeringPlayerClerkId?: StringNullableFilter<"MultiplayerGame"> | string | null
    currentCategory?: StringNullableFilter<"MultiplayerGame"> | string | null
    currentQuestions?: JsonNullableFilter<"MultiplayerGame">
    currentQuestionIndex?: IntFilter<"MultiplayerGame"> | number
    player1Score?: IntFilter<"MultiplayerGame"> | number
    player2Score?: IntFilter<"MultiplayerGame"> | number
    completedTurns?: IntFilter<"MultiplayerGame"> | number
    totalTurns?: IntFilter<"MultiplayerGame"> | number
    createdAt?: DateTimeFilter<"MultiplayerGame"> | Date | string
    updatedAt?: DateTimeFilter<"MultiplayerGame"> | Date | string
  }, "id" | "activePairKey">

  export type MultiplayerGameOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    phase?: SortOrder
    difficulty?: SortOrder
    player1ClerkId?: SortOrder
    player1Username?: SortOrder
    player2ClerkId?: SortOrder
    player2Username?: SortOrder
    currentTurnClerkId?: SortOrderInput | SortOrder
    answeringPlayerClerkId?: SortOrderInput | SortOrder
    currentCategory?: SortOrderInput | SortOrder
    currentQuestions?: SortOrderInput | SortOrder
    currentQuestionIndex?: SortOrder
    player1Score?: SortOrder
    player2Score?: SortOrder
    completedTurns?: SortOrder
    totalTurns?: SortOrder
    activePairKey?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MultiplayerGameCountOrderByAggregateInput
    _avg?: MultiplayerGameAvgOrderByAggregateInput
    _max?: MultiplayerGameMaxOrderByAggregateInput
    _min?: MultiplayerGameMinOrderByAggregateInput
    _sum?: MultiplayerGameSumOrderByAggregateInput
  }

  export type MultiplayerGameScalarWhereWithAggregatesInput = {
    AND?: MultiplayerGameScalarWhereWithAggregatesInput | MultiplayerGameScalarWhereWithAggregatesInput[]
    OR?: MultiplayerGameScalarWhereWithAggregatesInput[]
    NOT?: MultiplayerGameScalarWhereWithAggregatesInput | MultiplayerGameScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MultiplayerGame"> | string
    status?: EnumMultiplayerGameStatusWithAggregatesFilter<"MultiplayerGame"> | $Enums.MultiplayerGameStatus
    phase?: EnumMultiplayerPhaseWithAggregatesFilter<"MultiplayerGame"> | $Enums.MultiplayerPhase
    difficulty?: StringWithAggregatesFilter<"MultiplayerGame"> | string
    player1ClerkId?: StringWithAggregatesFilter<"MultiplayerGame"> | string
    player1Username?: StringWithAggregatesFilter<"MultiplayerGame"> | string
    player2ClerkId?: StringWithAggregatesFilter<"MultiplayerGame"> | string
    player2Username?: StringWithAggregatesFilter<"MultiplayerGame"> | string
    currentTurnClerkId?: StringNullableWithAggregatesFilter<"MultiplayerGame"> | string | null
    answeringPlayerClerkId?: StringNullableWithAggregatesFilter<"MultiplayerGame"> | string | null
    currentCategory?: StringNullableWithAggregatesFilter<"MultiplayerGame"> | string | null
    currentQuestions?: JsonNullableWithAggregatesFilter<"MultiplayerGame">
    currentQuestionIndex?: IntWithAggregatesFilter<"MultiplayerGame"> | number
    player1Score?: IntWithAggregatesFilter<"MultiplayerGame"> | number
    player2Score?: IntWithAggregatesFilter<"MultiplayerGame"> | number
    completedTurns?: IntWithAggregatesFilter<"MultiplayerGame"> | number
    totalTurns?: IntWithAggregatesFilter<"MultiplayerGame"> | number
    activePairKey?: StringNullableWithAggregatesFilter<"MultiplayerGame"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MultiplayerGame"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MultiplayerGame"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username?: string | null
    isOnline?: boolean
    clerkId?: string | null
    score?: number | null
    friends?: UserCreateNestedManyWithoutFriendOfInput
    friendOf?: UserCreateNestedManyWithoutFriendsInput
    pendingFriends?: UserCreateNestedManyWithoutPendingFromInput
    pendingFrom?: UserCreateNestedManyWithoutPendingFriendsInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username?: string | null
    isOnline?: boolean
    clerkId?: string | null
    score?: number | null
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
    pendingFriends?: UserUncheckedCreateNestedManyWithoutPendingFromInput
    pendingFrom?: UserUncheckedCreateNestedManyWithoutPendingFriendsInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    friends?: UserUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
    pendingFriends?: UserUpdateManyWithoutPendingFromNestedInput
    pendingFrom?: UserUpdateManyWithoutPendingFriendsNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
    pendingFriends?: UserUncheckedUpdateManyWithoutPendingFromNestedInput
    pendingFrom?: UserUncheckedUpdateManyWithoutPendingFriendsNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username?: string | null
    isOnline?: boolean
    clerkId?: string | null
    score?: number | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MultiplayerGameCreateInput = {
    id?: string
    status?: $Enums.MultiplayerGameStatus
    phase?: $Enums.MultiplayerPhase
    difficulty: string
    player1ClerkId: string
    player1Username: string
    player2ClerkId: string
    player2Username: string
    currentTurnClerkId?: string | null
    answeringPlayerClerkId?: string | null
    currentCategory?: string | null
    currentQuestions?: NullableJsonNullValueInput | InputJsonValue
    currentQuestionIndex?: number
    player1Score?: number
    player2Score?: number
    completedTurns?: number
    totalTurns?: number
    activePairKey?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MultiplayerGameUncheckedCreateInput = {
    id?: string
    status?: $Enums.MultiplayerGameStatus
    phase?: $Enums.MultiplayerPhase
    difficulty: string
    player1ClerkId: string
    player1Username: string
    player2ClerkId: string
    player2Username: string
    currentTurnClerkId?: string | null
    answeringPlayerClerkId?: string | null
    currentCategory?: string | null
    currentQuestions?: NullableJsonNullValueInput | InputJsonValue
    currentQuestionIndex?: number
    player1Score?: number
    player2Score?: number
    completedTurns?: number
    totalTurns?: number
    activePairKey?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MultiplayerGameUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMultiplayerGameStatusFieldUpdateOperationsInput | $Enums.MultiplayerGameStatus
    phase?: EnumMultiplayerPhaseFieldUpdateOperationsInput | $Enums.MultiplayerPhase
    difficulty?: StringFieldUpdateOperationsInput | string
    player1ClerkId?: StringFieldUpdateOperationsInput | string
    player1Username?: StringFieldUpdateOperationsInput | string
    player2ClerkId?: StringFieldUpdateOperationsInput | string
    player2Username?: StringFieldUpdateOperationsInput | string
    currentTurnClerkId?: NullableStringFieldUpdateOperationsInput | string | null
    answeringPlayerClerkId?: NullableStringFieldUpdateOperationsInput | string | null
    currentCategory?: NullableStringFieldUpdateOperationsInput | string | null
    currentQuestions?: NullableJsonNullValueInput | InputJsonValue
    currentQuestionIndex?: IntFieldUpdateOperationsInput | number
    player1Score?: IntFieldUpdateOperationsInput | number
    player2Score?: IntFieldUpdateOperationsInput | number
    completedTurns?: IntFieldUpdateOperationsInput | number
    totalTurns?: IntFieldUpdateOperationsInput | number
    activePairKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MultiplayerGameUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMultiplayerGameStatusFieldUpdateOperationsInput | $Enums.MultiplayerGameStatus
    phase?: EnumMultiplayerPhaseFieldUpdateOperationsInput | $Enums.MultiplayerPhase
    difficulty?: StringFieldUpdateOperationsInput | string
    player1ClerkId?: StringFieldUpdateOperationsInput | string
    player1Username?: StringFieldUpdateOperationsInput | string
    player2ClerkId?: StringFieldUpdateOperationsInput | string
    player2Username?: StringFieldUpdateOperationsInput | string
    currentTurnClerkId?: NullableStringFieldUpdateOperationsInput | string | null
    answeringPlayerClerkId?: NullableStringFieldUpdateOperationsInput | string | null
    currentCategory?: NullableStringFieldUpdateOperationsInput | string | null
    currentQuestions?: NullableJsonNullValueInput | InputJsonValue
    currentQuestionIndex?: IntFieldUpdateOperationsInput | number
    player1Score?: IntFieldUpdateOperationsInput | number
    player2Score?: IntFieldUpdateOperationsInput | number
    completedTurns?: IntFieldUpdateOperationsInput | number
    totalTurns?: IntFieldUpdateOperationsInput | number
    activePairKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MultiplayerGameCreateManyInput = {
    id?: string
    status?: $Enums.MultiplayerGameStatus
    phase?: $Enums.MultiplayerPhase
    difficulty: string
    player1ClerkId: string
    player1Username: string
    player2ClerkId: string
    player2Username: string
    currentTurnClerkId?: string | null
    answeringPlayerClerkId?: string | null
    currentCategory?: string | null
    currentQuestions?: NullableJsonNullValueInput | InputJsonValue
    currentQuestionIndex?: number
    player1Score?: number
    player2Score?: number
    completedTurns?: number
    totalTurns?: number
    activePairKey?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MultiplayerGameUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMultiplayerGameStatusFieldUpdateOperationsInput | $Enums.MultiplayerGameStatus
    phase?: EnumMultiplayerPhaseFieldUpdateOperationsInput | $Enums.MultiplayerPhase
    difficulty?: StringFieldUpdateOperationsInput | string
    player1ClerkId?: StringFieldUpdateOperationsInput | string
    player1Username?: StringFieldUpdateOperationsInput | string
    player2ClerkId?: StringFieldUpdateOperationsInput | string
    player2Username?: StringFieldUpdateOperationsInput | string
    currentTurnClerkId?: NullableStringFieldUpdateOperationsInput | string | null
    answeringPlayerClerkId?: NullableStringFieldUpdateOperationsInput | string | null
    currentCategory?: NullableStringFieldUpdateOperationsInput | string | null
    currentQuestions?: NullableJsonNullValueInput | InputJsonValue
    currentQuestionIndex?: IntFieldUpdateOperationsInput | number
    player1Score?: IntFieldUpdateOperationsInput | number
    player2Score?: IntFieldUpdateOperationsInput | number
    completedTurns?: IntFieldUpdateOperationsInput | number
    totalTurns?: IntFieldUpdateOperationsInput | number
    activePairKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MultiplayerGameUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMultiplayerGameStatusFieldUpdateOperationsInput | $Enums.MultiplayerGameStatus
    phase?: EnumMultiplayerPhaseFieldUpdateOperationsInput | $Enums.MultiplayerPhase
    difficulty?: StringFieldUpdateOperationsInput | string
    player1ClerkId?: StringFieldUpdateOperationsInput | string
    player1Username?: StringFieldUpdateOperationsInput | string
    player2ClerkId?: StringFieldUpdateOperationsInput | string
    player2Username?: StringFieldUpdateOperationsInput | string
    currentTurnClerkId?: NullableStringFieldUpdateOperationsInput | string | null
    answeringPlayerClerkId?: NullableStringFieldUpdateOperationsInput | string | null
    currentCategory?: NullableStringFieldUpdateOperationsInput | string | null
    currentQuestions?: NullableJsonNullValueInput | InputJsonValue
    currentQuestionIndex?: IntFieldUpdateOperationsInput | number
    player1Score?: IntFieldUpdateOperationsInput | number
    player2Score?: IntFieldUpdateOperationsInput | number
    completedTurns?: IntFieldUpdateOperationsInput | number
    totalTurns?: IntFieldUpdateOperationsInput | number
    activePairKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    isOnline?: SortOrder
    clerkId?: SortOrder
    score?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    isOnline?: SortOrder
    clerkId?: SortOrder
    score?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    isOnline?: SortOrder
    clerkId?: SortOrder
    score?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumMultiplayerGameStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MultiplayerGameStatus | EnumMultiplayerGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MultiplayerGameStatus[] | ListEnumMultiplayerGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MultiplayerGameStatus[] | ListEnumMultiplayerGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMultiplayerGameStatusFilter<$PrismaModel> | $Enums.MultiplayerGameStatus
  }

  export type EnumMultiplayerPhaseFilter<$PrismaModel = never> = {
    equals?: $Enums.MultiplayerPhase | EnumMultiplayerPhaseFieldRefInput<$PrismaModel>
    in?: $Enums.MultiplayerPhase[] | ListEnumMultiplayerPhaseFieldRefInput<$PrismaModel>
    notIn?: $Enums.MultiplayerPhase[] | ListEnumMultiplayerPhaseFieldRefInput<$PrismaModel>
    not?: NestedEnumMultiplayerPhaseFilter<$PrismaModel> | $Enums.MultiplayerPhase
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MultiplayerGameCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    phase?: SortOrder
    difficulty?: SortOrder
    player1ClerkId?: SortOrder
    player1Username?: SortOrder
    player2ClerkId?: SortOrder
    player2Username?: SortOrder
    currentTurnClerkId?: SortOrder
    answeringPlayerClerkId?: SortOrder
    currentCategory?: SortOrder
    currentQuestions?: SortOrder
    currentQuestionIndex?: SortOrder
    player1Score?: SortOrder
    player2Score?: SortOrder
    completedTurns?: SortOrder
    totalTurns?: SortOrder
    activePairKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MultiplayerGameAvgOrderByAggregateInput = {
    currentQuestionIndex?: SortOrder
    player1Score?: SortOrder
    player2Score?: SortOrder
    completedTurns?: SortOrder
    totalTurns?: SortOrder
  }

  export type MultiplayerGameMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    phase?: SortOrder
    difficulty?: SortOrder
    player1ClerkId?: SortOrder
    player1Username?: SortOrder
    player2ClerkId?: SortOrder
    player2Username?: SortOrder
    currentTurnClerkId?: SortOrder
    answeringPlayerClerkId?: SortOrder
    currentCategory?: SortOrder
    currentQuestionIndex?: SortOrder
    player1Score?: SortOrder
    player2Score?: SortOrder
    completedTurns?: SortOrder
    totalTurns?: SortOrder
    activePairKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MultiplayerGameMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    phase?: SortOrder
    difficulty?: SortOrder
    player1ClerkId?: SortOrder
    player1Username?: SortOrder
    player2ClerkId?: SortOrder
    player2Username?: SortOrder
    currentTurnClerkId?: SortOrder
    answeringPlayerClerkId?: SortOrder
    currentCategory?: SortOrder
    currentQuestionIndex?: SortOrder
    player1Score?: SortOrder
    player2Score?: SortOrder
    completedTurns?: SortOrder
    totalTurns?: SortOrder
    activePairKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MultiplayerGameSumOrderByAggregateInput = {
    currentQuestionIndex?: SortOrder
    player1Score?: SortOrder
    player2Score?: SortOrder
    completedTurns?: SortOrder
    totalTurns?: SortOrder
  }

  export type EnumMultiplayerGameStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MultiplayerGameStatus | EnumMultiplayerGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MultiplayerGameStatus[] | ListEnumMultiplayerGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MultiplayerGameStatus[] | ListEnumMultiplayerGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMultiplayerGameStatusWithAggregatesFilter<$PrismaModel> | $Enums.MultiplayerGameStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMultiplayerGameStatusFilter<$PrismaModel>
    _max?: NestedEnumMultiplayerGameStatusFilter<$PrismaModel>
  }

  export type EnumMultiplayerPhaseWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MultiplayerPhase | EnumMultiplayerPhaseFieldRefInput<$PrismaModel>
    in?: $Enums.MultiplayerPhase[] | ListEnumMultiplayerPhaseFieldRefInput<$PrismaModel>
    notIn?: $Enums.MultiplayerPhase[] | ListEnumMultiplayerPhaseFieldRefInput<$PrismaModel>
    not?: NestedEnumMultiplayerPhaseWithAggregatesFilter<$PrismaModel> | $Enums.MultiplayerPhase
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMultiplayerPhaseFilter<$PrismaModel>
    _max?: NestedEnumMultiplayerPhaseFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserCreateNestedManyWithoutFriendOfInput = {
    create?: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput> | UserCreateWithoutFriendOfInput[] | UserUncheckedCreateWithoutFriendOfInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendOfInput | UserCreateOrConnectWithoutFriendOfInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutFriendsInput = {
    create?: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput> | UserCreateWithoutFriendsInput[] | UserUncheckedCreateWithoutFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsInput | UserCreateOrConnectWithoutFriendsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutPendingFromInput = {
    create?: XOR<UserCreateWithoutPendingFromInput, UserUncheckedCreateWithoutPendingFromInput> | UserCreateWithoutPendingFromInput[] | UserUncheckedCreateWithoutPendingFromInput[]
    connectOrCreate?: UserCreateOrConnectWithoutPendingFromInput | UserCreateOrConnectWithoutPendingFromInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutPendingFriendsInput = {
    create?: XOR<UserCreateWithoutPendingFriendsInput, UserUncheckedCreateWithoutPendingFriendsInput> | UserCreateWithoutPendingFriendsInput[] | UserUncheckedCreateWithoutPendingFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutPendingFriendsInput | UserCreateOrConnectWithoutPendingFriendsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutFriendOfInput = {
    create?: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput> | UserCreateWithoutFriendOfInput[] | UserUncheckedCreateWithoutFriendOfInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendOfInput | UserCreateOrConnectWithoutFriendOfInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutFriendsInput = {
    create?: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput> | UserCreateWithoutFriendsInput[] | UserUncheckedCreateWithoutFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsInput | UserCreateOrConnectWithoutFriendsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutPendingFromInput = {
    create?: XOR<UserCreateWithoutPendingFromInput, UserUncheckedCreateWithoutPendingFromInput> | UserCreateWithoutPendingFromInput[] | UserUncheckedCreateWithoutPendingFromInput[]
    connectOrCreate?: UserCreateOrConnectWithoutPendingFromInput | UserCreateOrConnectWithoutPendingFromInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutPendingFriendsInput = {
    create?: XOR<UserCreateWithoutPendingFriendsInput, UserUncheckedCreateWithoutPendingFriendsInput> | UserCreateWithoutPendingFriendsInput[] | UserUncheckedCreateWithoutPendingFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutPendingFriendsInput | UserCreateOrConnectWithoutPendingFriendsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateManyWithoutFriendOfNestedInput = {
    create?: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput> | UserCreateWithoutFriendOfInput[] | UserUncheckedCreateWithoutFriendOfInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendOfInput | UserCreateOrConnectWithoutFriendOfInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFriendOfInput | UserUpsertWithWhereUniqueWithoutFriendOfInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFriendOfInput | UserUpdateWithWhereUniqueWithoutFriendOfInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFriendOfInput | UserUpdateManyWithWhereWithoutFriendOfInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUpdateManyWithoutFriendsNestedInput = {
    create?: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput> | UserCreateWithoutFriendsInput[] | UserUncheckedCreateWithoutFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsInput | UserCreateOrConnectWithoutFriendsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFriendsInput | UserUpsertWithWhereUniqueWithoutFriendsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFriendsInput | UserUpdateWithWhereUniqueWithoutFriendsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFriendsInput | UserUpdateManyWithWhereWithoutFriendsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUpdateManyWithoutPendingFromNestedInput = {
    create?: XOR<UserCreateWithoutPendingFromInput, UserUncheckedCreateWithoutPendingFromInput> | UserCreateWithoutPendingFromInput[] | UserUncheckedCreateWithoutPendingFromInput[]
    connectOrCreate?: UserCreateOrConnectWithoutPendingFromInput | UserCreateOrConnectWithoutPendingFromInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutPendingFromInput | UserUpsertWithWhereUniqueWithoutPendingFromInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutPendingFromInput | UserUpdateWithWhereUniqueWithoutPendingFromInput[]
    updateMany?: UserUpdateManyWithWhereWithoutPendingFromInput | UserUpdateManyWithWhereWithoutPendingFromInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUpdateManyWithoutPendingFriendsNestedInput = {
    create?: XOR<UserCreateWithoutPendingFriendsInput, UserUncheckedCreateWithoutPendingFriendsInput> | UserCreateWithoutPendingFriendsInput[] | UserUncheckedCreateWithoutPendingFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutPendingFriendsInput | UserCreateOrConnectWithoutPendingFriendsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutPendingFriendsInput | UserUpsertWithWhereUniqueWithoutPendingFriendsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutPendingFriendsInput | UserUpdateWithWhereUniqueWithoutPendingFriendsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutPendingFriendsInput | UserUpdateManyWithWhereWithoutPendingFriendsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutFriendOfNestedInput = {
    create?: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput> | UserCreateWithoutFriendOfInput[] | UserUncheckedCreateWithoutFriendOfInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendOfInput | UserCreateOrConnectWithoutFriendOfInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFriendOfInput | UserUpsertWithWhereUniqueWithoutFriendOfInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFriendOfInput | UserUpdateWithWhereUniqueWithoutFriendOfInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFriendOfInput | UserUpdateManyWithWhereWithoutFriendOfInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutFriendsNestedInput = {
    create?: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput> | UserCreateWithoutFriendsInput[] | UserUncheckedCreateWithoutFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsInput | UserCreateOrConnectWithoutFriendsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFriendsInput | UserUpsertWithWhereUniqueWithoutFriendsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFriendsInput | UserUpdateWithWhereUniqueWithoutFriendsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFriendsInput | UserUpdateManyWithWhereWithoutFriendsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutPendingFromNestedInput = {
    create?: XOR<UserCreateWithoutPendingFromInput, UserUncheckedCreateWithoutPendingFromInput> | UserCreateWithoutPendingFromInput[] | UserUncheckedCreateWithoutPendingFromInput[]
    connectOrCreate?: UserCreateOrConnectWithoutPendingFromInput | UserCreateOrConnectWithoutPendingFromInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutPendingFromInput | UserUpsertWithWhereUniqueWithoutPendingFromInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutPendingFromInput | UserUpdateWithWhereUniqueWithoutPendingFromInput[]
    updateMany?: UserUpdateManyWithWhereWithoutPendingFromInput | UserUpdateManyWithWhereWithoutPendingFromInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutPendingFriendsNestedInput = {
    create?: XOR<UserCreateWithoutPendingFriendsInput, UserUncheckedCreateWithoutPendingFriendsInput> | UserCreateWithoutPendingFriendsInput[] | UserUncheckedCreateWithoutPendingFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutPendingFriendsInput | UserCreateOrConnectWithoutPendingFriendsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutPendingFriendsInput | UserUpsertWithWhereUniqueWithoutPendingFriendsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutPendingFriendsInput | UserUpdateWithWhereUniqueWithoutPendingFriendsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutPendingFriendsInput | UserUpdateManyWithWhereWithoutPendingFriendsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type EnumMultiplayerGameStatusFieldUpdateOperationsInput = {
    set?: $Enums.MultiplayerGameStatus
  }

  export type EnumMultiplayerPhaseFieldUpdateOperationsInput = {
    set?: $Enums.MultiplayerPhase
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumMultiplayerGameStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MultiplayerGameStatus | EnumMultiplayerGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MultiplayerGameStatus[] | ListEnumMultiplayerGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MultiplayerGameStatus[] | ListEnumMultiplayerGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMultiplayerGameStatusFilter<$PrismaModel> | $Enums.MultiplayerGameStatus
  }

  export type NestedEnumMultiplayerPhaseFilter<$PrismaModel = never> = {
    equals?: $Enums.MultiplayerPhase | EnumMultiplayerPhaseFieldRefInput<$PrismaModel>
    in?: $Enums.MultiplayerPhase[] | ListEnumMultiplayerPhaseFieldRefInput<$PrismaModel>
    notIn?: $Enums.MultiplayerPhase[] | ListEnumMultiplayerPhaseFieldRefInput<$PrismaModel>
    not?: NestedEnumMultiplayerPhaseFilter<$PrismaModel> | $Enums.MultiplayerPhase
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumMultiplayerGameStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MultiplayerGameStatus | EnumMultiplayerGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MultiplayerGameStatus[] | ListEnumMultiplayerGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MultiplayerGameStatus[] | ListEnumMultiplayerGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMultiplayerGameStatusWithAggregatesFilter<$PrismaModel> | $Enums.MultiplayerGameStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMultiplayerGameStatusFilter<$PrismaModel>
    _max?: NestedEnumMultiplayerGameStatusFilter<$PrismaModel>
  }

  export type NestedEnumMultiplayerPhaseWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MultiplayerPhase | EnumMultiplayerPhaseFieldRefInput<$PrismaModel>
    in?: $Enums.MultiplayerPhase[] | ListEnumMultiplayerPhaseFieldRefInput<$PrismaModel>
    notIn?: $Enums.MultiplayerPhase[] | ListEnumMultiplayerPhaseFieldRefInput<$PrismaModel>
    not?: NestedEnumMultiplayerPhaseWithAggregatesFilter<$PrismaModel> | $Enums.MultiplayerPhase
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMultiplayerPhaseFilter<$PrismaModel>
    _max?: NestedEnumMultiplayerPhaseFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserCreateWithoutFriendOfInput = {
    id?: string
    username?: string | null
    isOnline?: boolean
    clerkId?: string | null
    score?: number | null
    friends?: UserCreateNestedManyWithoutFriendOfInput
    pendingFriends?: UserCreateNestedManyWithoutPendingFromInput
    pendingFrom?: UserCreateNestedManyWithoutPendingFriendsInput
  }

  export type UserUncheckedCreateWithoutFriendOfInput = {
    id?: string
    username?: string | null
    isOnline?: boolean
    clerkId?: string | null
    score?: number | null
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
    pendingFriends?: UserUncheckedCreateNestedManyWithoutPendingFromInput
    pendingFrom?: UserUncheckedCreateNestedManyWithoutPendingFriendsInput
  }

  export type UserCreateOrConnectWithoutFriendOfInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput>
  }

  export type UserCreateWithoutFriendsInput = {
    id?: string
    username?: string | null
    isOnline?: boolean
    clerkId?: string | null
    score?: number | null
    friendOf?: UserCreateNestedManyWithoutFriendsInput
    pendingFriends?: UserCreateNestedManyWithoutPendingFromInput
    pendingFrom?: UserCreateNestedManyWithoutPendingFriendsInput
  }

  export type UserUncheckedCreateWithoutFriendsInput = {
    id?: string
    username?: string | null
    isOnline?: boolean
    clerkId?: string | null
    score?: number | null
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
    pendingFriends?: UserUncheckedCreateNestedManyWithoutPendingFromInput
    pendingFrom?: UserUncheckedCreateNestedManyWithoutPendingFriendsInput
  }

  export type UserCreateOrConnectWithoutFriendsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput>
  }

  export type UserCreateWithoutPendingFromInput = {
    id?: string
    username?: string | null
    isOnline?: boolean
    clerkId?: string | null
    score?: number | null
    friends?: UserCreateNestedManyWithoutFriendOfInput
    friendOf?: UserCreateNestedManyWithoutFriendsInput
    pendingFriends?: UserCreateNestedManyWithoutPendingFromInput
  }

  export type UserUncheckedCreateWithoutPendingFromInput = {
    id?: string
    username?: string | null
    isOnline?: boolean
    clerkId?: string | null
    score?: number | null
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
    pendingFriends?: UserUncheckedCreateNestedManyWithoutPendingFromInput
  }

  export type UserCreateOrConnectWithoutPendingFromInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPendingFromInput, UserUncheckedCreateWithoutPendingFromInput>
  }

  export type UserCreateWithoutPendingFriendsInput = {
    id?: string
    username?: string | null
    isOnline?: boolean
    clerkId?: string | null
    score?: number | null
    friends?: UserCreateNestedManyWithoutFriendOfInput
    friendOf?: UserCreateNestedManyWithoutFriendsInput
    pendingFrom?: UserCreateNestedManyWithoutPendingFriendsInput
  }

  export type UserUncheckedCreateWithoutPendingFriendsInput = {
    id?: string
    username?: string | null
    isOnline?: boolean
    clerkId?: string | null
    score?: number | null
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
    pendingFrom?: UserUncheckedCreateNestedManyWithoutPendingFriendsInput
  }

  export type UserCreateOrConnectWithoutPendingFriendsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPendingFriendsInput, UserUncheckedCreateWithoutPendingFriendsInput>
  }

  export type UserUpsertWithWhereUniqueWithoutFriendOfInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutFriendOfInput, UserUncheckedUpdateWithoutFriendOfInput>
    create: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput>
  }

  export type UserUpdateWithWhereUniqueWithoutFriendOfInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutFriendOfInput, UserUncheckedUpdateWithoutFriendOfInput>
  }

  export type UserUpdateManyWithWhereWithoutFriendOfInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutFriendOfInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringNullableFilter<"User"> | string | null
    isOnline?: BoolFilter<"User"> | boolean
    clerkId?: StringNullableFilter<"User"> | string | null
    score?: IntNullableFilter<"User"> | number | null
  }

  export type UserUpsertWithWhereUniqueWithoutFriendsInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutFriendsInput, UserUncheckedUpdateWithoutFriendsInput>
    create: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput>
  }

  export type UserUpdateWithWhereUniqueWithoutFriendsInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutFriendsInput, UserUncheckedUpdateWithoutFriendsInput>
  }

  export type UserUpdateManyWithWhereWithoutFriendsInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutFriendsInput>
  }

  export type UserUpsertWithWhereUniqueWithoutPendingFromInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutPendingFromInput, UserUncheckedUpdateWithoutPendingFromInput>
    create: XOR<UserCreateWithoutPendingFromInput, UserUncheckedCreateWithoutPendingFromInput>
  }

  export type UserUpdateWithWhereUniqueWithoutPendingFromInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutPendingFromInput, UserUncheckedUpdateWithoutPendingFromInput>
  }

  export type UserUpdateManyWithWhereWithoutPendingFromInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutPendingFromInput>
  }

  export type UserUpsertWithWhereUniqueWithoutPendingFriendsInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutPendingFriendsInput, UserUncheckedUpdateWithoutPendingFriendsInput>
    create: XOR<UserCreateWithoutPendingFriendsInput, UserUncheckedCreateWithoutPendingFriendsInput>
  }

  export type UserUpdateWithWhereUniqueWithoutPendingFriendsInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutPendingFriendsInput, UserUncheckedUpdateWithoutPendingFriendsInput>
  }

  export type UserUpdateManyWithWhereWithoutPendingFriendsInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutPendingFriendsInput>
  }

  export type UserUpdateWithoutFriendOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    friends?: UserUpdateManyWithoutFriendOfNestedInput
    pendingFriends?: UserUpdateManyWithoutPendingFromNestedInput
    pendingFrom?: UserUpdateManyWithoutPendingFriendsNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
    pendingFriends?: UserUncheckedUpdateManyWithoutPendingFromNestedInput
    pendingFrom?: UserUncheckedUpdateManyWithoutPendingFriendsNestedInput
  }

  export type UserUncheckedUpdateManyWithoutFriendOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserUpdateWithoutFriendsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
    pendingFriends?: UserUpdateManyWithoutPendingFromNestedInput
    pendingFrom?: UserUpdateManyWithoutPendingFriendsNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
    pendingFriends?: UserUncheckedUpdateManyWithoutPendingFromNestedInput
    pendingFrom?: UserUncheckedUpdateManyWithoutPendingFriendsNestedInput
  }

  export type UserUncheckedUpdateManyWithoutFriendsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserUpdateWithoutPendingFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    friends?: UserUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
    pendingFriends?: UserUpdateManyWithoutPendingFromNestedInput
  }

  export type UserUncheckedUpdateWithoutPendingFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
    pendingFriends?: UserUncheckedUpdateManyWithoutPendingFromNestedInput
  }

  export type UserUncheckedUpdateManyWithoutPendingFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserUpdateWithoutPendingFriendsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    friends?: UserUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
    pendingFrom?: UserUpdateManyWithoutPendingFriendsNestedInput
  }

  export type UserUncheckedUpdateWithoutPendingFriendsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
    pendingFrom?: UserUncheckedUpdateManyWithoutPendingFriendsNestedInput
  }

  export type UserUncheckedUpdateManyWithoutPendingFriendsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}