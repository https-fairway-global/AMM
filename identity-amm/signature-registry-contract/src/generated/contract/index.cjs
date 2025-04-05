'use strict';
const __compactRuntime = require('@midnight-ntwrk/compact-runtime');
const expectedRuntimeVersionString = '0.7.0';
const expectedRuntimeVersion = expectedRuntimeVersionString.split('-')[0].split('.').map(Number);
const actualRuntimeVersion = __compactRuntime.versionString.split('-')[0].split('.').map(Number);
if (expectedRuntimeVersion[0] != actualRuntimeVersion[0]
     || (actualRuntimeVersion[0] == 0 && expectedRuntimeVersion[1] != actualRuntimeVersion[1])
     || expectedRuntimeVersion[1] > actualRuntimeVersion[1]
     || (expectedRuntimeVersion[1] == actualRuntimeVersion[1] && expectedRuntimeVersion[2] > actualRuntimeVersion[2]))
   throw new __compactRuntime.CompactError(`Version mismatch: compiled code expects ${expectedRuntimeVersionString}, runtime is ${__compactRuntime.versionString}`);
{ const MAX_FIELD = 102211695604070082112571065507755096754575920209623522239390234855480569854275933742834077002685857629445612735086326265689167708028928n;
  if (__compactRuntime.MAX_FIELD !== MAX_FIELD)
     throw new __compactRuntime.CompactError(`compiler thinks maximum field value is ${MAX_FIELD}; run time thinks it is ${__compactRuntime.MAX_FIELD}`)
}

const _descriptor_0 = new __compactRuntime.CompactTypeField();

const _descriptor_1 = new __compactRuntime.CompactTypeBoolean();

const _descriptor_2 = new __compactRuntime.CompactTypeVector(2, _descriptor_0);

class _FaydaCredential_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment())))))));
  }
  fromValue(value_0) {
    return {
      id: _descriptor_0.fromValue(value_0),
      issuer: _descriptor_0.fromValue(value_0),
      issuance_date: _descriptor_0.fromValue(value_0),
      valid_until: _descriptor_0.fromValue(value_0),
      subject_id: _descriptor_0.fromValue(value_0),
      citizenship: _descriptor_0.fromValue(value_0),
      region: _descriptor_0.fromValue(value_0),
      signature: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.id).concat(_descriptor_0.toValue(value_0.issuer).concat(_descriptor_0.toValue(value_0.issuance_date).concat(_descriptor_0.toValue(value_0.valid_until).concat(_descriptor_0.toValue(value_0.subject_id).concat(_descriptor_0.toValue(value_0.citizenship).concat(_descriptor_0.toValue(value_0.region).concat(_descriptor_2.toValue(value_0.signature))))))));
  }
}

const _descriptor_3 = new _FaydaCredential_0();

const _descriptor_4 = new __compactRuntime.CompactTypeOpaqueString();

class _CurvePoint_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment());
  }
  fromValue(value_0) {
    return {
      x: _descriptor_0.fromValue(value_0),
      y: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.x).concat(_descriptor_0.toValue(value_0.y));
  }
}

const _descriptor_5 = new _CurvePoint_0();

const _descriptor_6 = new __compactRuntime.CompactTypeBytes(32);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_6.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_6.toValue(value_0.bytes);
  }
}

const _descriptor_7 = new _ContractAddress_0();

const _descriptor_8 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_9 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1)
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object')
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    if (typeof(witnesses_0.parse_fayda_credential) !== 'function')
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named parse_fayda_credential');
    if (typeof(witnesses_0.user_secret_key) !== 'function')
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named user_secret_key');
    if (typeof(witnesses_0.current_time) !== 'function')
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named current_time');
    this.witnesses = witnesses_0;
    this.circuits = {
      register_verification: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`register_verification: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const credential_json_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('register_verification',
                                      'argument 1 (as invoked from Typescript)',
                                      './src/registry.compact line 125, char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_4.toValue(credential_json_0),
            alignment: _descriptor_4.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_register_verification_0(context,
                                                        partialProofData,
                                                        credential_json_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      is_user_verified: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`is_user_verified: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const user_address_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('is_user_verified',
                                      'argument 1 (as invoked from Typescript)',
                                      './src/registry.compact line 144, char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(user_address_0) === 'bigint' && user_address_0 >= 0 && user_address_0 <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('is_user_verified',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      './src/registry.compact line 144, char 1',
                                      'Field',
                                      user_address_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(user_address_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_is_user_verified_0(context,
                                                   partialProofData,
                                                   user_address_0);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      get_verification_expiration: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`get_verification_expiration: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const user_address_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('get_verification_expiration',
                                      'argument 1 (as invoked from Typescript)',
                                      './src/registry.compact line 157, char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(user_address_0) === 'bigint' && user_address_0 >= 0 && user_address_0 <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('get_verification_expiration',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      './src/registry.compact line 157, char 1',
                                      'Field',
                                      user_address_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(user_address_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_get_verification_expiration_0(context,
                                                              partialProofData,
                                                              user_address_0);
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      }
    };
    this.impureCircuits = {
      register_verification: this.circuits.register_verification,
      is_user_verified: this.circuits.is_user_verified,
      get_verification_expiration: this.circuits.get_verification_expiration
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1)
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = stateValue_0;
    state_0.setOperation('register_verification', new __compactRuntime.ContractOperation());
    state_0.setOperation('is_user_verified', new __compactRuntime.ContractOperation());
    state_0.setOperation('get_verification_expiration', new __compactRuntime.ContractOperation());
    const context = {
      originalState: state_0,
      currentPrivateState: constructorContext_0.initialPrivateState,
      currentZswapLocalState: constructorContext_0.initialZswapLocalState,
      transactionContext: new __compactRuntime.QueryContext(state_0.data, __compactRuntime.dummyContractAddress())
    };
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                            alignment: _descriptor_9.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    state_0.data = context.transactionContext.state;
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  #_ec_mul_generator_0(context, partialProofData, b_0) {
    const result_0 = __compactRuntime.ecMulGenerator(b_0);
    return result_0;
  }
  #_trusted_issuer_1_0(context, partialProofData) { return 1234567890n; }
  #_trusted_issuer_2_0(context, partialProofData) { return 9876543210n; }
  #_ethiopian_citizenship_value_0(context, partialProofData) {
    return 5432109876n;
  }
  #_is_trusted_issuer_0(context, partialProofData, issuer_0) {
    return issuer_0 === this.#_trusted_issuer_1_0(context, partialProofData)
           ||
           issuer_0 === this.#_trusted_issuer_2_0(context, partialProofData);
  }
  #_get_current_time_0(context, partialProofData) {
    return this.#_current_time_0(context, partialProofData);
  }
  #_curve_point_to_field_0(context, partialProofData, point_0) {
    return point_0.x;
  }
  #_get_user_address_0(context, partialProofData) {
    const secret_key_0 = this.#_user_secret_key_0(context, partialProofData);
    const public_key_0 = this.#_ec_mul_generator_0(context,
                                                   partialProofData,
                                                   secret_key_0);
    return this.#_curve_point_to_field_0(context, partialProofData, public_key_0);
  }
  #_field_greater_than_0(context, partialProofData, a_0, b_0) {
    return !(a_0 === b_0) && !(a_0 === 0n);
  }
  #_parse_fayda_credential_0(context, partialProofData, credential_json_0) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.parse_fayda_credential(witnessContext_0,
                                                                                 credential_json_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'object' && typeof(result_0.id) === 'bigint' && result_0.id >= 0 && result_0.id <= __compactRuntime.MAX_FIELD && typeof(result_0.issuer) === 'bigint' && result_0.issuer >= 0 && result_0.issuer <= __compactRuntime.MAX_FIELD && typeof(result_0.issuance_date) === 'bigint' && result_0.issuance_date >= 0 && result_0.issuance_date <= __compactRuntime.MAX_FIELD && typeof(result_0.valid_until) === 'bigint' && result_0.valid_until >= 0 && result_0.valid_until <= __compactRuntime.MAX_FIELD && typeof(result_0.subject_id) === 'bigint' && result_0.subject_id >= 0 && result_0.subject_id <= __compactRuntime.MAX_FIELD && typeof(result_0.citizenship) === 'bigint' && result_0.citizenship >= 0 && result_0.citizenship <= __compactRuntime.MAX_FIELD && typeof(result_0.region) === 'bigint' && result_0.region >= 0 && result_0.region <= __compactRuntime.MAX_FIELD && Array.isArray(result_0.signature) && result_0.signature.length === 2 && result_0.signature.every((t) => typeof(t) === 'bigint' && t >= 0 && t <= __compactRuntime.MAX_FIELD)))
      __compactRuntime.type_error('parse_fayda_credential',
                                  'return value',
                                  './src/registry.compact line 91, char 1',
                                  'struct FaydaCredential<id: Field, issuer: Field, issuance_date: Field, valid_until: Field, subject_id: Field, citizenship: Field, region: Field, signature: Vector<2, Field>>',
                                  result_0)
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_3.toValue(result_0),
      alignment: _descriptor_3.alignment()
    });
    return result_0;
  }
  #_user_secret_key_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.user_secret_key(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'bigint' && result_0 >= 0 && result_0 <= __compactRuntime.MAX_FIELD))
      __compactRuntime.type_error('user_secret_key',
                                  'return value',
                                  './src/registry.compact line 94, char 1',
                                  'Field',
                                  result_0)
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  #_current_time_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.current_time(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'bigint' && result_0 >= 0 && result_0 <= __compactRuntime.MAX_FIELD))
      __compactRuntime.type_error('current_time',
                                  'return value',
                                  './src/registry.compact line 97, char 1',
                                  'Field',
                                  result_0)
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  #_verify_ethiopian_citizenship_0(context, partialProofData, credential_0) {
    const valid_issuer_0 = this.#_is_trusted_issuer_0(context,
                                                      partialProofData,
                                                      credential_0.issuer);
    const is_ethiopian_0 = credential_0.citizenship
                           ===
                           this.#_ethiopian_citizenship_value_0(context,
                                                                partialProofData);
    const current_time_val_0 = this.#_get_current_time_0(context,
                                                         partialProofData);
    const not_expired_0 = this.#_field_greater_than_0(context,
                                                      partialProofData,
                                                      credential_0.valid_until,
                                                      current_time_val_0);
    return valid_issuer_0 && is_ethiopian_0 && not_expired_0;
  }
  #_register_verification_0(context, partialProofData, credential_json_0) {
    const credential_0 = this.#_parse_fayda_credential_0(context,
                                                         partialProofData,
                                                         credential_json_0);
    const is_valid_0 = this.#_verify_ethiopian_citizenship_0(context,
                                                             partialProofData,
                                                             credential_0);
    __compactRuntime.assert(is_valid_0,
                            'Invalid or expired Ethiopian credential provided.');
    const user_address_0 = this.#_get_user_address_0(context, partialProofData);
    const expiration_timestamp_0 = credential_0.valid_until;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_9.toValue(0n),
                                                alignment: _descriptor_9.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(user_address_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(expiration_timestamp_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  #_is_user_verified_0(context, partialProofData, user_address_0) {
    const expiration_timestamp_0 = _descriptor_0.fromValue(Contract._query(context,
                                                                           partialProofData,
                                                                           [
                                                                            { dup: { n: 0 } },
                                                                            { idx: { cached: false,
                                                                                     pushPath: false,
                                                                                     path: [
                                                                                            { tag: 'value',
                                                                                              value: { value: _descriptor_9.toValue(0n),
                                                                                                       alignment: _descriptor_9.alignment() } }] } },
                                                                            { idx: { cached: false,
                                                                                     pushPath: false,
                                                                                     path: [
                                                                                            { tag: 'value',
                                                                                              value: { value: _descriptor_0.toValue(user_address_0),
                                                                                                       alignment: _descriptor_0.alignment() } }] } },
                                                                            { popeq: { cached: false,
                                                                                       result: undefined } }]).value);
    const current_time_val_0 = this.#_get_current_time_0(context,
                                                         partialProofData);
    return this.#_field_greater_than_0(context,
                                       partialProofData,
                                       expiration_timestamp_0,
                                       current_time_val_0);
  }
  #_get_verification_expiration_0(context, partialProofData, user_address_0) {
    return _descriptor_0.fromValue(Contract._query(context,
                                                   partialProofData,
                                                   [
                                                    { dup: { n: 0 } },
                                                    { idx: { cached: false,
                                                             pushPath: false,
                                                             path: [
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_9.toValue(0n),
                                                                               alignment: _descriptor_9.alignment() } }] } },
                                                    { idx: { cached: false,
                                                             pushPath: false,
                                                             path: [
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_0.toValue(user_address_0),
                                                                               alignment: _descriptor_0.alignment() } }] } },
                                                    { popeq: { cached: false,
                                                               result: undefined } }]).value);
  }
  static _query(context, partialProofData, prog) {
    var res;
    try {
      res = context.transactionContext.query(prog, __compactRuntime.CostModel.dummyCostModel());
    } catch (err) {
      throw new __compactRuntime.CompactError(err.toString());
    }
    context.transactionContext = res.context;
    var reads = res.events.filter((e) => e.tag === 'read');
    var i = 0;
    partialProofData.publicTranscript = partialProofData.publicTranscript.concat(prog.map((op) => {
      if(typeof(op) === 'object' && 'popeq' in op) {
        return { popeq: {
          ...op.popeq,
          result: reads[i++].content,
        } };
      } else {
        return op;
      }
    }));
    if(res.events.length == 1 && res.events[0].tag === 'read') {
      return res.events[0].content;
    } else {
      return res.events;
    }
  }
}
function ledger(state) {
  const context = {
    originalState: state,
    transactionContext: new __compactRuntime.QueryContext(state, __compactRuntime.dummyContractAddress())
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    verifiedUsers: {
      isEmpty(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`is_empty: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_9.toValue(0n),
                                                                                   alignment: _descriptor_9.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                                                               alignment: _descriptor_8.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_9.toValue(0n),
                                                                                   alignment: _descriptor_9.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0 && key_0 <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      './src/registry.compact line 9, char 1',
                                      'Field',
                                      key_0)
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_9.toValue(0n),
                                                                                   alignment: _descriptor_9.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0 && key_0 <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      './src/registry.compact line 9, char 1',
                                      'Field',
                                      key_0)
        return _descriptor_0.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_9.toValue(0n),
                                                                                   alignment: _descriptor_9.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        const self_0 = state.asArray()[0];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    }
  };
}
const _emptyContext = {
  originalState: new __compactRuntime.ContractState(),
  transactionContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  parse_fayda_credential: (...args) => undefined,
  user_secret_key: (...args) => undefined,
  current_time: (...args) => undefined
});
const pureCircuits = { };
const contractReferenceLocations = { tag: 'publicLedgerArray', indices: { } };
exports.Contract = Contract;
exports.ledger = ledger;
exports.pureCircuits = pureCircuits;
exports.contractReferenceLocations = contractReferenceLocations;
//# sourceMappingURL=index.cjs.map
