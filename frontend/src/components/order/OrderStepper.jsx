import { Check } from 'lucide-react';
import React from 'react';

const steps = [
    { id: 1, name: 'Submit Order' },
    { id: 2, name: 'Payment' },
    { id: 3, name: 'Get Assigned an Expert' },
    { id: 4, name: 'Approval' },
    { id: 5, name: 'Completed' }
];

const OrderStepper = ({ currentStep = 1 }) => {
    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-center">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div
                            className={
                                step.id < currentStep
                                    ? 'completed-step'
                                    : step.id === currentStep
                                      ? 'active-step'
                                      : 'pending-step'
                            }
                        >
                            <div className="flex flex-col items-center">
                                <div className="step-number">
                                    {step.id < currentStep ? (
                                        <Check size={16} />
                                    ) : (
                                        step.id
                                    )}
                                </div>
                                <div className="text-xs mt-1">{step.name}</div>
                            </div>
                        </div>

                        {index < steps.length - 1 && (
                            <div
                                className={`step-connector ${
                                    step.id < currentStep
                                        ? 'completed-connector'
                                        : 'pending-connector'
                                }`}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default OrderStepper;
