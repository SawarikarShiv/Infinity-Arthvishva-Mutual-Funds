// Mock service for admin features
// In production, replace with actual API calls

const adminService = {
    // User Management
    async getUsers(params = {}) {
        const { page = 1, limit = 10, filters = {}, sort = {} } = params;
        
        // Mock data
        const users = Array.from({ length: 125 }, (_, i) => ({
            id: `USER${1000 + i}`,
            firstName: ['Rajesh', 'Priya', 'Amit', 'Sunita', 'Vikram'][i % 5],
            lastName: ['Kumar', 'Sharma', 'Patel', 'Reddy', 'Singh'][i % 5],
            email: `user${1000 + i}@example.com`,
            phone: `98765${String(43210 + i).padStart(5, '0')}`,
            role: i % 10 === 0 ? 'admin' : i % 5 === 0 ? 'advisor' : 'investor',
            status: ['active', 'inactive', 'suspended', 'pending'][i % 4],
            createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            lastLogin: i % 3 === 0 ? new Date(Date.now() - i * 60 * 60 * 1000).toISOString() : null,
            kycStatus: i % 5 === 0 ? 'pending' : 'verified',
            totalInvestment: 50000 + i * 10000,
            currentPortfolioValue: 55000 + i * 12000,
            activeSIPs: i % 3,
            xirr: 12.5 + (i % 10) / 10
        }));

        // Apply filters
        let filteredUsers = [...users];
        
        if (filters.role && filters.role !== 'all') {
            filteredUsers = filteredUsers.filter(user => user.role === filters.role);
        }
        
        if (filters.status && filters.status !== 'all') {
            filteredUsers = filteredUsers.filter(user => user.status === filters.status);
        }
        
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filteredUsers = filteredUsers.filter(user => 
                user.firstName.toLowerCase().includes(searchLower) ||
                user.lastName.toLowerCase().includes(searchLower) ||
                user.email.toLowerCase().includes(searchLower) ||
                user.phone.includes(filters.search)
            );
        }

        // Apply sorting
        if (sort.key && sort.direction) {
            filteredUsers.sort((a, b) => {
                let aValue = a[sort.key];
                let bValue = b[sort.key];
                
                if (sort.key === 'createdAt' || sort.key === 'lastLogin') {
                    aValue = new Date(aValue).getTime();
                    bValue = new Date(bValue).getTime();
                }
                
                if (sort.direction === 'asc') {
                    return aValue > bValue ? 1 : -1;
                } else {
                    return aValue < bValue ? 1 : -1;
                }
            });
        }

        // Apply pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    data: paginatedUsers,
                    pagination: {
                        page,
                        limit,
                        total: filteredUsers.length,
                        pages: Math.ceil(filteredUsers.length / limit)
                    }
                });
            }, 500);
        });
    },

    async getUserById(userId) {
        // Mock user data
        const user = {
            id: userId,
            firstName: 'Rajesh',
            lastName: 'Kumar',
            email: 'rajesh.kumar@example.com',
            phone: '9876543210',
            role: 'investor',
            status: 'active',
            dateOfBirth: '1985-06-15',
            panNumber: 'ABCDE1234F',
            kycStatus: 'verified',
            emailVerified: true,
            twoFactorEnabled: false,
            isLocked: false,
            createdAt: '2023-01-15T10:30:00Z',
            lastLogin: new Date().toISOString(),
            totalInvestment: 1250000,
            currentPortfolioValue: 1450000,
            activeSIPs: 3,
            xirr: 18.5,
            address: {
                street: '123 Main Street',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400001',
                country: 'India'
            },
            bankDetails: {
                accountNumber: 'XXXXXX1234',
                bankName: 'State Bank of India',
                ifscCode: 'SBIN0001234',
                accountHolder: 'Rajesh Kumar'
            }
        };

        return new Promise(resolve => {
            setTimeout(() => {
                resolve(user);
            }, 300);
        });
    },

    async createUser(userData) {
        console.log('Creating user:', userData);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    ...userData,
                    id: `USER${Date.now()}`,
                    createdAt: new Date().toISOString(),
                    status: 'active'
                });
            }, 500);
        });
    },

    async updateUser(userId, userData) {
        console.log('Updating user:', userId, userData);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    id: userId,
                    ...userData,
                    updatedAt: new Date().toISOString()
                });
            }, 500);
        });
    },

    async deleteUser(userId) {
        console.log('Deleting user:', userId);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ success: true, userId });
            }, 500);
        });
    },

    async updateUserStatus(userId, status) {
        console.log('Updating user status:', userId, status);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    userId,
                    status,
                    updatedAt: new Date().toISOString()
                });
            }, 300);
        });
    },

    // System Configuration
    async getConfig() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    platformName: 'Infinity Arthvishva Mutual Funds',
                    supportEmail: 'support@infinityarthvishva.com',
                    supportPhone: '+91 9876543210',
                    currency: 'INR',
                    allowRegistrations: true,
                    requireEmailVerification: true,
                    requireKYC: true,
                    minInvestment: 500,
                    maxInvestment: 10000000,
                    maintenanceMode: false,
                    enable2FA: true,
                    requireStrongPasswords: true,
                    sessionTimeout: 30,
                    maxLoginAttempts: 5,
                    smtpHost: 'smtp.gmail.com',
                    smtpPort: 587,
                    smtpUsername: 'noreply@infinityarthvishva.com',
                    smtpEncryption: 'tls',
                    sendWelcomeEmail: true,
                    sendInvestmentConfirmations: true,
                    sendMonthlyStatements: true,
                    sendMarketUpdates: true
                });
            }, 300);
        });
    },

    async updateConfig(configData) {
        console.log('Updating config:', configData);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(configData);
            }, 500);
        });
    },

    async toggleMaintenanceMode(enabled, message = '', estimatedTime = '') {
        console.log('Toggling maintenance mode:', enabled, message, estimatedTime);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    maintenanceMode: enabled,
                    maintenanceMessage: message,
                    estimatedEndTime: estimatedTime,
                    maintenanceStartTime: enabled ? new Date().toISOString() : null
                });
            }, 500);
        });
    },

    async createBackup(backupData) {
        console.log('Creating backup:', backupData);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    id: `BACKUP${Date.now()}`,
                    ...backupData,
                    size: Math.floor(Math.random() * 1000000000) + 500000000, // 500MB - 1.5GB
                    status: 'completed',
                    createdAt: new Date().toISOString(),
                    downloadUrl: '/backups/backup.zip'
                });
            }, 1000);
        });
    },

    async restoreBackup(backupId) {
        console.log('Restoring backup:', backupId);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ success: true, backupId });
            }, 1500);
        });
    },

    // Audit Logs
    async getAuditLogs(params = {}) {
        const { page = 1, limit = 20, filters = {} } = params;
        
        // Mock audit logs
        const actions = ['login', 'logout', 'create', 'update', 'delete', 'read', 'export', 'import'];
        const users = ['Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sunita Reddy', 'Vikram Singh', 'System', 'Admin'];
        const entities = ['user', 'fund', 'portfolio', 'transaction', 'system', 'config'];
        
        const logs = Array.from({ length: 12458 }, (_, i) => {
            const action = actions[i % actions.length];
            const user = users[i % users.length];
            const severity = i % 100 === 0 ? 'high' : i % 20 === 0 ? 'medium' : i % 5 === 0 ? 'low' : 'info';
            
            return {
                id: `LOG${10000 + i}`,
                userId: `USER${1000 + (i % 100)}`,
                userName: user,
                userEmail: user === 'System' || user === 'Admin' ? null : `${user.replace(' ', '.').toLowerCase()}@example.com`,
                userRole: user === 'Admin' ? 'admin' : user === 'System' ? 'system' : i % 10 === 0 ? 'advisor' : 'investor',
                action: action,
                entity: entities[i % entities.length],
                entityId: `${entities[i % entities.length].toUpperCase()}${1000 + i}`,
                details: `${action} action performed on ${entities[i % entities.length]} ${1000 + i}`,
                timestamp: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
                severity: severity,
                ipAddress: i % 5 === 0 ? null : `192.168.${i % 256}.${(i * 13) % 256}`,
                userAgent: i % 3 === 0 ? null : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                metadata: i % 10 === 0 ? JSON.stringify({ reason: 'test', method: 'POST' }) : null,
                changes: i % 15 === 0 ? { oldValue: 'old', newValue: 'new' } : null,
                duration: Math.floor(Math.random() * 1000) + 50
            };
        });

        // Apply filters
        let filteredLogs = [...logs];
        
        if (filters.actionType && filters.actionType !== 'all') {
            filteredLogs = filteredLogs.filter(log => log.action === filters.actionType);
        }
        
        if (filters.userId) {
            filteredLogs = filteredLogs.filter(log => 
                log.userId.includes(filters.userId) || 
                log.userEmail?.includes(filters.userId)
            );
        }
        
        if (filters.dateRange?.start) {
            const startDate = new Date(filters.dateRange.start);
            filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) >= startDate);
        }
        
        if (filters.dateRange?.end) {
            const endDate = new Date(filters.dateRange.end);
            endDate.setHours(23, 59, 59, 999);
            filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) <= endDate);
        }
        
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filteredLogs = filteredLogs.filter(log => 
                log.details.toLowerCase().includes(searchLower) ||
                log.userName.toLowerCase().includes(searchLower)
            );
        }

        // Apply pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedLogs = filteredLogs.slice(startIndex, endIndex);

        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    data: paginatedLogs,
                    pagination: {
                        page,
                        limit,
                        total: filteredLogs.length,
                        pages: Math.ceil(filteredLogs.length / limit)
                    }
                });
            }, 500);
        });
    },

    async getAuditLogById(logId) {
        // Find log by ID from mock data
        const log = {
            id: logId,
            userId: 'USER1001',
            userName: 'Rajesh Kumar',
            userEmail: 'rajesh.kumar@example.com',
            userRole: 'investor',
            action: 'update',
            entity: 'portfolio',
            entityId: 'PORTFOLIO1001',
            details: 'Updated portfolio allocation for large cap funds',
            timestamp: new Date().toISOString(),
            severity: 'low',
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            metadata: JSON.stringify({
                previousAllocation: 60,
                newAllocation: 65,
                fundName: 'SBI Bluechip Fund'
            }),
            changes: {
                allocation: { old: 60, new: 65 },
                updatedAt: new Date().toISOString()
            },
            duration: 245
        };

        return new Promise(resolve => {
            setTimeout(() => {
                resolve(log);
            }, 300);
        });
    },

    async clearAuditLogs(params) {
        console.log('Clearing audit logs:', params);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ success: true, clearedCount: 12458 });
            }, 800);
        });
    },

    async exportAuditLogs(params) {
        console.log('Exporting audit logs:', params);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    success: true,
                    downloadUrl: '/exports/audit-logs.csv',
                    recordCount: 12458
                });
            }, 1000);
        });
    }
};

export default adminService;
EOF