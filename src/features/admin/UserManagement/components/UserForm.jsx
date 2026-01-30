import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, updateUser, selectUsersLoading } from '../userSlice';
import PrimaryButton from '@components/common/Button/PrimaryButton';
import SecondaryButton from '@components/common/Button/SecondaryButton';
import TextInput from '@components/common/Inputs/TextInput';
import SelectInput from '@components/common/Inputs/SelectInput';
import Checkbox from '@components/common/Inputs/Checkbox';
import { USER_ROLES, USER_STATUS } from '@utils/constants/userRoles';

// Validation schemas
const createUserSchema = yup.object({
    firstName: yup.string().required('First name is required').min(2, 'Minimum 2 characters'),
    lastName: yup.string().required('Last name is required').min(2, 'Minimum 2 characters'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    phone: yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    role: yup.string().oneOf(Object.values(USER_ROLES), 'Invalid role').required('Role is required'),
    status: yup.string().oneOf(Object.values(USER_STATUS), 'Invalid status').required('Status is required'),
    sendWelcomeEmail: yup.boolean()
});

const updateUserSchema = yup.object({
    firstName: yup.string().min(2, 'Minimum 2 characters'),
    lastName: yup.string().min(2, 'Minimum 2 characters'),
    email: yup.string().email('Invalid email format'),
    phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    role: yup.string().oneOf(Object.values(USER_ROLES), 'Invalid role'),
    status: yup.string().oneOf(Object.values(USER_STATUS), 'Invalid status')
});

const UserForm = ({ user = null, onSuccess, onCancel }) => {
    const dispatch = useDispatch();
    const loading = useSelector(selectUsersLoading);
    
    const [isEditing, setIsEditing] = useState(!!user);
    const [showPassword, setShowPassword] = useState(false);
    const [initialPassword, setInitialPassword] = useState('');

    const schema = isEditing ? updateUserSchema : createUserSchema;

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: user || {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            role: USER_ROLES.INVESTOR,
            status: USER_STATUS.ACTIVE,
            sendWelcomeEmail: true
        }
    });

    useEffect(() => {
        if (user) {
            reset(user);
        }
    }, [user, reset]);

    const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setInitialPassword(password);
        setValue('password', password);
        setValue('confirmPassword', password);
    };

    const onSubmit = async (data) => {
        try {
            if (isEditing) {
                await dispatch(updateUser({ id: user.id, ...data })).unwrap();
            } else {
                await dispatch(createUser(data)).unwrap();
            }
            
            if (onSuccess) {
                onSuccess();
            }
            
            if (!isEditing) {
                reset();
                setInitialPassword('');
            }
        } catch (error) {
            console.error('Failed to save user:', error);
        }
    };

    const roleOptions = [
        { value: USER_ROLES.ADMIN, label: 'Administrator' },
        { value: USER_ROLES.ADVISOR, label: 'Financial Advisor' },
        { value: USER_ROLES.INVESTOR, label: 'Investor' }
    ];

    const statusOptions = [
        { value: USER_STATUS.ACTIVE, label: 'Active' },
        { value: USER_STATUS.INACTIVE, label: 'Inactive' },
        { value: USER_STATUS.SUSPENDED, label: 'Suspended' },
        { value: USER_STATUS.PENDING, label: 'Pending Verification' }
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    {isEditing ? 'Edit User' : 'Create New User'}
                </h2>
                <p className="text-gray-600">
                    {isEditing 
                        ? 'Update user information and permissions'
                        : 'Add a new user to the platform'
                    }
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextInput
                            label="First Name"
                            {...register('firstName')}
                            error={errors.firstName?.message}
                            required
                        />

                        <TextInput
                            label="Last Name"
                            {...register('lastName')}
                            error={errors.lastName?.message}
                            required
                        />
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextInput
                            label="Email Address"
                            type="email"
                            {...register('email')}
                            error={errors.email?.message}
                            required={!isEditing}
                            disabled={isEditing}
                        />

                        <TextInput
                            label="Phone Number"
                            type="tel"
                            {...register('phone')}
                            error={errors.phone?.message}
                            required
                        />
                    </div>
                </div>

                {/* Account Settings */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Account Settings</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <SelectInput
                            label="User Role"
                            options={roleOptions}
                            {...register('role')}
                            error={errors.role?.message}
                            required
                        />

                        <SelectInput
                            label="Account Status"
                            options={statusOptions}
                            {...register('status')}
                            error={errors.status?.message}
                            required
                        />
                    </div>

                    {/* Password Section (only for new users) */}
                    {!isEditing && (
                        <div className="space-y-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-gray-700">Initial Password</h4>
                                    <p className="text-sm text-gray-500">
                                        Set initial password for the user
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={generatePassword}
                                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                                >
                                    Generate Password
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <TextInput
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password')}
                                        error={errors.password?.message}
                                        value={initialPassword}
                                        onChange={(e) => setInitialPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <TextInput
                                        label="Confirm Password"
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('confirmPassword')}
                                        error={errors.confirmPassword?.message}
                                        value={initialPassword}
                                        onChange={(e) => setValue('confirmPassword', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <Checkbox
                                label="Show password"
                                checked={showPassword}
                                onChange={(e) => setShowPassword(e.target.checked)}
                            />
                        </div>
                    )}
                </div>

                {/* Additional Options */}
                {!isEditing && (
                    <div className="bg-blue-50 rounded-lg p-4">
                        <Checkbox
                            label="Send welcome email with login instructions"
                            {...register('sendWelcomeEmail')}
                            error={errors.sendWelcomeEmail?.message}
                        />
                        <p className="text-sm text-blue-700 mt-2">
                            User will receive an email with their login credentials and platform introduction.
                        </p>
                    </div>
                )}

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <SecondaryButton
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </SecondaryButton>
                    
                    <PrimaryButton
                        type="submit"
                        isLoading={loading}
                        disabled={loading}
                    >
                        {isEditing ? 'Update User' : 'Create User'}
                    </PrimaryButton>
                </div>
            </form>

            {/* Success Message */}
            {initialPassword && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-700 font-medium">Password Generated Successfully</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                        Copy this password and share it securely with the user: 
                        <code className="ml-2 font-mono bg-green-100 px-2 py-1 rounded">
                            {initialPassword}
                        </code>
                    </p>
                </div>
            )}
        </div>
    );
};

export default UserForm;
EOF