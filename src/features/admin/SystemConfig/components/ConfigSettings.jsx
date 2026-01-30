import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateConfig, selectConfig, selectConfigLoading } from '../configSlice';
import PrimaryButton from '@components/common/Button/PrimaryButton';
import SecondaryButton from '@components/common/Button/SecondaryButton';
import TextInput from '@components/common/Inputs/TextInput';
import SelectInput from '@components/common/Inputs/SelectInput';
import Checkbox from '@components/common/Inputs/Checkbox';

const ConfigSettings = () => {
    const dispatch = useDispatch();
    const config = useSelector(selectConfig);
    const loading = useSelector(selectConfigLoading);
    
    const [activeSection, setActiveSection] = useState('general');
    const [isSaving, setIsSaving] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        defaultValues: config || {}
    });

    const sections = [
        { id: 'general', label: 'General', icon: '⚙️' },
        { id: 'security', label: 'Security', icon: '🔒' },
        { id: 'email', label: 'Email', icon: '📧' },
        { id: 'notifications', label: 'Notifications', icon: '🔔' },
        { id: 'payment', label: 'Payment', icon: '💳' },
        { id: 'api', label: 'API Settings', icon: '🔌' }
    ];

    const onSubmit = async (data) => {
        setIsSaving(true);
        try {
            await dispatch(updateConfig(data)).unwrap();
            // Show success message
        } catch (error) {
            console.error('Failed to save config:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const renderSectionContent = () => {
        switch (activeSection) {
            case 'general':
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h4 className="text-lg font-semibold text-gray-700 mb-4">Platform Settings</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextInput
                                    label="Platform Name"
                                    {...register('platformName')}
                                    error={errors.platformName?.message}
                                />
                                <TextInput
                                    label="Support Email"
                                    type="email"
                                    {...register('supportEmail')}
                                    error={errors.supportEmail?.message}
                                />
                                <TextInput
                                    label="Support Phone"
                                    {...register('supportPhone')}
                                    error={errors.supportPhone?.message}
                                />
                                <SelectInput
                                    label="Default Currency"
                                    options={[
                                        { value: 'INR', label: 'Indian Rupee (₹)' },
                                        { value: 'USD', label: 'US Dollar ($)' },
                                        { value: 'EUR', label: 'Euro (€)' }
                                    ]}
                                    {...register('currency')}
                                    error={errors.currency?.message}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h4 className="text-lg font-semibold text-gray-700 mb-4">Registration Settings</h4>
                            <div className="space-y-4">
                                <Checkbox
                                    label="Allow new user registrations"
                                    {...register('allowRegistrations')}
                                />
                                <Checkbox
                                    label="Require email verification"
                                    {...register('requireEmailVerification')}
                                />
                                <Checkbox
                                    label="Require KYC for investment"
                                    {...register('requireKYC')}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <TextInput
                                        label="Minimum investment amount (₹)"
                                        type="number"
                                        {...register('minInvestment')}
                                        error={errors.minInvestment?.message}
                                    />
                                    <TextInput
                                        label="Maximum investment amount (₹)"
                                        type="number"
                                        {...register('maxInvestment')}
                                        error={errors.maxInvestment?.message}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'security':
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h4 className="text-lg font-semibold text-gray-700 mb-4">Security Settings</h4>
                            <div className="space-y-4">
                                <Checkbox
                                    label="Enable Two-Factor Authentication (2FA)"
                                    {...register('enable2FA')}
                                />
                                <Checkbox
                                    label="Require strong passwords"
                                    {...register('requireStrongPasswords')}
                                />
                                <Checkbox
                                    label="Enable login notifications"
                                    {...register('enableLoginNotifications')}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <TextInput
                                        label="Session timeout (minutes)"
                                        type="number"
                                        {...register('sessionTimeout')}
                                        error={errors.sessionTimeout?.message}
                                    />
                                    <TextInput
                                        label="Max login attempts"
                                        type="number"
                                        {...register('maxLoginAttempts')}
                                        error={errors.maxLoginAttempts?.message}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h4 className="text-lg font-semibold text-gray-700 mb-4">Password Policy</h4>
                            <div className="space-y-3">
                                <Checkbox
                                    label="Minimum 8 characters"
                                    checked={true}
                                    disabled
                                />
                                <Checkbox
                                    label="Require uppercase letters"
                                    {...register('passwordRequireUppercase')}
                                />
                                <Checkbox
                                    label="Require lowercase letters"
                                    {...register('passwordRequireLowercase')}
                                />
                                <Checkbox
                                    label="Require numbers"
                                    {...register('passwordRequireNumbers')}
                                />
                                <Checkbox
                                    label="Require special characters"
                                    {...register('passwordRequireSpecial')}
                                />
                                <TextInput
                                    label="Password expiry (days)"
                                    type="number"
                                    {...register('passwordExpiryDays')}
                                    error={errors.passwordExpiryDays?.message}
                                />
                            </div>
                        </div>
                    </div>
                );

            case 'email':
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h4 className="text-lg font-semibold text-gray-700 mb-4">SMTP Settings</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextInput
                                    label="SMTP Host"
                                    {...register('smtpHost')}
                                    error={errors.smtpHost?.message}
                                />
                                <TextInput
                                    label="SMTP Port"
                                    type="number"
                                    {...register('smtpPort')}
                                    error={errors.smtpPort?.message}
                                />
                                <TextInput
                                    label="SMTP Username"
                                    {...register('smtpUsername')}
                                    error={errors.smtpUsername?.message}
                                />
                                <TextInput
                                    label="SMTP Password"
                                    type="password"
                                    {...register('smtpPassword')}
                                    error={errors.smtpPassword?.message}
                                />
                                <SelectInput
                                    label="Encryption"
                                    options={[
                                        { value: 'none', label: 'None' },
                                        { value: 'ssl', label: 'SSL' },
                                        { value: 'tls', label: 'TLS' }
                                    ]}
                                    {...register('smtpEncryption')}
                                    error={errors.smtpEncryption?.message}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h4 className="text-lg font-semibold text-gray-700 mb-4">Email Templates</h4>
                            <div className="space-y-4">
                                <Checkbox
                                    label="Send welcome emails to new users"
                                    {...register('sendWelcomeEmail')}
                                />
                                <Checkbox
                                    label="Send investment confirmations"
                                    {...register('sendInvestmentConfirmations')}
                                />
                                <Checkbox
                                    label="Send monthly statements"
                                    {...register('sendMonthlyStatements')}
                                />
                                <Checkbox
                                    label="Send market updates"
                                    {...register('sendMarketUpdates')}
                                />
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">{sections.find(s => s.id === activeSection)?.icon}</div>
                            <h4 className="text-xl font-semibold text-gray-700 mb-2">
                                {sections.find(s => s.id === activeSection)?.label} Settings
                            </h4>
                            <p className="text-gray-600">Configuration options for this section will appear here.</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">System Configuration</h2>
                <p className="text-gray-600">Configure platform settings and preferences</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar Navigation */}
                <div className="lg:w-64">
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-700">Settings</h3>
                        </div>
                        <nav className="p-2">
                            {sections.map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-1 transition ${
                                        activeSection === section.id
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="mr-3 text-lg">{section.icon}</span>
                                    {section.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {renderSectionContent()}
                        
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex justify-end space-x-4">
                                <SecondaryButton
                                    type="button"
                                    onClick={() => reset()}
                                    disabled={loading || isSaving}
                                >
                                    Reset Changes
                                </SecondaryButton>
                                <PrimaryButton
                                    type="submit"
                                    isLoading={loading || isSaving}
                                    disabled={loading || isSaving}
                                >
                                    Save Changes
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ConfigSettings;
EOF
