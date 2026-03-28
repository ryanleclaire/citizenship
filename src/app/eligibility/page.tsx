"use client";

import { useReducer } from "react";
import WizardQuestion from "@/components/wizard/WizardQuestion";
import WizardOption from "@/components/wizard/WizardOption";
import WizardOutcome from "@/components/wizard/WizardOutcome";
import {
  type WizardState,
  type BirthTiming,
  initialWizardState,
  getGenerationLabel,
} from "@/lib/eligibility";

type Action =
  | { type: "SET_BORN_IN_CANADA"; value: boolean }
  | { type: "SET_PARENT_IS_CITIZEN"; value: boolean }
  | { type: "SET_PARENT_BORN_IN_CANADA"; value: boolean }
  | { type: "SET_BIRTH_DATE"; value: BirthTiming }
  | { type: "SET_CAN_TRACE_CHAIN"; value: boolean }
  | { type: "SET_GENERATIONS"; value: number }
  | { type: "SET_PHYSICAL_PRESENCE"; value: boolean | null }
  | { type: "RESET" };

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case "SET_BORN_IN_CANADA":
      if (action.value) {
        return { ...initialWizardState, bornInCanada: true, outcome: "A", generation: "G0" };
      }
      return { ...initialWizardState, bornInCanada: false };

    case "SET_PARENT_IS_CITIZEN":
      if (!action.value) {
        return { ...state, parentIsCitizen: false, outcome: "F" };
      }
      return { ...state, parentIsCitizen: true };

    case "SET_PARENT_BORN_IN_CANADA":
      if (action.value) {
        return { ...state, parentBornInCanada: true, outcome: "B", generation: "G1" };
      }
      return { ...state, parentBornInCanada: false };

    case "SET_BIRTH_DATE":
      return { ...state, birthDate: action.value };

    case "SET_CAN_TRACE_CHAIN":
      if (!action.value) {
        return { ...state, canTraceChain: false, outcome: "E" };
      }
      return { ...state, canTraceChain: true };

    case "SET_GENERATIONS": {
      const gen = getGenerationLabel(action.value);
      return {
        ...state,
        generationsFromAnchor: action.value,
        outcome: "C",
        generation: gen,
      };
    }

    case "SET_PHYSICAL_PRESENCE":
      if (action.value === true) {
        return { ...state, parentPhysicalPresenceMet: true, outcome: "D" };
      }
      if (action.value === false) {
        return { ...state, parentPhysicalPresenceMet: false, outcome: "G" };
      }
      return { ...state, parentPhysicalPresenceMet: null, outcome: "E" };

    case "RESET":
      return initialWizardState;

    default:
      return state;
  }
}

function getCurrentStep(state: WizardState): number {
  if (state.bornInCanada === null) return 1;
  if (state.bornInCanada) return -1; // outcome
  if (state.parentIsCitizen === null) return 2;
  if (!state.parentIsCitizen) return -1;
  if (state.parentBornInCanada === null) return 3;
  if (state.parentBornInCanada) return -1;
  if (state.birthDate === null) return 4;
  if (state.birthDate === "before") {
    if (state.canTraceChain === null) return 5;
    if (!state.canTraceChain) return -1;
    if (state.generationsFromAnchor === null) return 6;
    return -1;
  }
  // prospective
  if (state.parentPhysicalPresenceMet === null) return 5;
  return -1;
}

function getTotalSteps(state: WizardState): number {
  if (state.birthDate === "onOrAfter") return 5;
  if (state.birthDate === "before" && state.canTraceChain) return 6;
  if (state.birthDate === "before") return 5;
  return 6; // maximum
}

export default function EligibilityPage() {
  const [state, dispatch] = useReducer(reducer, initialWizardState);
  const currentStep = getCurrentStep(state);

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
            Eligibility Check
          </h1>
          <p className="text-navy-400">
            Answer a few questions to find out if you may qualify for Canadian
            citizenship under Bill C-3.
          </p>
        </div>

        {/* Show outcome or current question */}
        {state.outcome ? (
          <WizardOutcome
            outcome={state.outcome}
            generation={state.generation}
            onRestart={() => dispatch({ type: "RESET" })}
          />
        ) : (
          <>
            {/* Q1: Born in Canada? */}
            {currentStep === 1 && (
              <WizardQuestion
                question="Were you born in Canada?"
                stepNumber={1}
                totalSteps={getTotalSteps(state)}
              >
                <div className="space-y-3">
                  <WizardOption
                    label="Yes"
                    description="I was born on Canadian soil"
                    onClick={() => dispatch({ type: "SET_BORN_IN_CANADA", value: true })}
                  />
                  <WizardOption
                    label="No"
                    description="I was born outside Canada"
                    onClick={() => dispatch({ type: "SET_BORN_IN_CANADA", value: false })}
                  />
                </div>
              </WizardQuestion>
            )}

            {/* Q2: Parent a citizen? */}
            {currentStep === 2 && (
              <WizardQuestion
                question="Was at least one of your parents a Canadian citizen at the time of your birth?"
                helpText="This includes parents who may have been Canadian citizens without knowing it. Under Bill C-3, many people born abroad to Canadian parents are retroactively recognized as citizens."
                stepNumber={2}
                totalSteps={getTotalSteps(state)}
              >
                <div className="space-y-3">
                  <WizardOption
                    label="Yes"
                    description="At least one parent was (or may have been) a Canadian citizen"
                    onClick={() => dispatch({ type: "SET_PARENT_IS_CITIZEN", value: true })}
                  />
                  <WizardOption
                    label="No"
                    description="Neither parent had any connection to Canadian citizenship"
                    onClick={() => dispatch({ type: "SET_PARENT_IS_CITIZEN", value: false })}
                  />
                </div>
              </WizardQuestion>
            )}

            {/* Q3: Parent born in Canada? */}
            {currentStep === 3 && (
              <WizardQuestion
                question="Was your Canadian parent born in Canada?"
                helpText="If they were born in Canada, you are first-generation born abroad and were already a citizen before Bill C-3."
                stepNumber={3}
                totalSteps={getTotalSteps(state)}
              >
                <div className="space-y-3">
                  <WizardOption
                    label="Yes"
                    description="My Canadian parent was born in Canada"
                    onClick={() => dispatch({ type: "SET_PARENT_BORN_IN_CANADA", value: true })}
                  />
                  <WizardOption
                    label="No"
                    description="My Canadian parent was also born outside Canada"
                    onClick={() => dispatch({ type: "SET_PARENT_BORN_IN_CANADA", value: false })}
                  />
                </div>
              </WizardQuestion>
            )}

            {/* Q4: Birth date relative to Dec 15, 2025 */}
            {currentStep === 4 && (
              <WizardQuestion
                question="Were you born before December 15, 2025?"
                helpText="This date determines which set of rules applies to you. Bill C-3 came into force on December 15, 2025."
                stepNumber={4}
                totalSteps={getTotalSteps(state)}
              >
                <div className="space-y-3">
                  <WizardOption
                    label="Yes, I was born before December 15, 2025"
                    description="The retroactive provisions apply — no generational limit"
                    onClick={() => dispatch({ type: "SET_BIRTH_DATE", value: "before" })}
                    variant="highlighted"
                  />
                  <WizardOption
                    label="No, I was born on or after December 15, 2025"
                    description="The prospective provisions apply — a substantial connection test is required"
                    onClick={() => dispatch({ type: "SET_BIRTH_DATE", value: "onOrAfter" })}
                  />
                </div>
              </WizardQuestion>
            )}

            {/* Q5 (Retroactive): Can trace chain? */}
            {currentStep === 5 && state.birthDate === "before" && (
              <WizardQuestion
                question="Can you trace an unbroken chain of parent-child relationships back to an ancestor who was born or naturalized in Canada?"
                helpText="You need to be able to document each generation with long-form birth certificates. The chain cannot skip generations — each person must be the child of the next."
                stepNumber={5}
                totalSteps={getTotalSteps(state)}
              >
                <div className="space-y-3">
                  <WizardOption
                    label="Yes"
                    description="I can trace my lineage back to a Canadian-born or naturalized ancestor"
                    onClick={() => dispatch({ type: "SET_CAN_TRACE_CHAIN", value: true })}
                  />
                  <WizardOption
                    label="No / I'm not sure"
                    description="I need to research my family history further"
                    onClick={() => dispatch({ type: "SET_CAN_TRACE_CHAIN", value: false })}
                  />
                </div>
              </WizardQuestion>
            )}

            {/* Q6 (Retroactive): How many generations? */}
            {currentStep === 6 && state.birthDate === "before" && (
              <WizardQuestion
                question="How many generations separate you from your Canadian-born or naturalized ancestor?"
                helpText="Count the generations between you and the ancestor who was born in Canada or became a naturalized Canadian citizen. For example: if your grandparent was born in Canada, that's 1 generation between you (your parent is the intermediate generation)."
                stepNumber={6}
                totalSteps={getTotalSteps(state)}
              >
                <div className="space-y-3">
                  <WizardOption
                    label="1 generation (grandparent is the anchor)"
                    description="You are G2 — second generation born abroad"
                    onClick={() => dispatch({ type: "SET_GENERATIONS", value: 1 })}
                  />
                  <WizardOption
                    label="2 generations (great-grandparent is the anchor)"
                    description="You are G3 — third generation born abroad"
                    onClick={() => dispatch({ type: "SET_GENERATIONS", value: 2 })}
                  />
                  <WizardOption
                    label="3 generations (great-great-grandparent is the anchor)"
                    description="You are G4 — fourth generation born abroad"
                    onClick={() => dispatch({ type: "SET_GENERATIONS", value: 3 })}
                  />
                  <WizardOption
                    label="4 or more generations"
                    description="You are G5+ — documentary challenges increase significantly"
                    onClick={() => dispatch({ type: "SET_GENERATIONS", value: 4 })}
                  />
                </div>
              </WizardQuestion>
            )}

            {/* Q5 (Prospective): Physical presence */}
            {currentStep === 5 && state.birthDate === "onOrAfter" && (
              <WizardQuestion
                question="Can your Canadian parent demonstrate at least 1,095 days (3 years) of cumulative physical presence in Canada before your birth?"
                helpText="The days do NOT need to be consecutive — any combination of time spent physically in Canada counts toward the 1,095-day total."
                stepNumber={5}
                totalSteps={getTotalSteps(state)}
              >
                <div className="space-y-3">
                  <WizardOption
                    label="Yes"
                    description="My parent has spent at least 3 cumulative years in Canada"
                    onClick={() => dispatch({ type: "SET_PHYSICAL_PRESENCE", value: true })}
                  />
                  <WizardOption
                    label="No"
                    description="My parent has not yet accumulated 1,095 days in Canada"
                    onClick={() => dispatch({ type: "SET_PHYSICAL_PRESENCE", value: false })}
                  />
                  <WizardOption
                    label="I'm not sure"
                    description="I need help calculating my parent's physical presence days"
                    onClick={() => dispatch({ type: "SET_PHYSICAL_PRESENCE", value: null })}
                  />
                </div>
              </WizardQuestion>
            )}
          </>
        )}
      </div>
    </div>
  );
}
