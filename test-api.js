// Simple API test script
const testAPI = async () => {
  const baseURL = 'http://localhost:3000';
  
  console.log('🧪 Testing Breaking Cycles API...\n');
  
  // Test 1: Register new user
  console.log('1. Testing user registration...');
  try {
    const registerResponse = await fetch(`${baseURL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        phone: '+1234567890',
        location: 'Test City'
      })
    });
    
    const registerData = await registerResponse.json();
    console.log('✅ Registration:', registerResponse.status, registerData.message);
    
    if (registerData.verificationUrl) {
      console.log('🔗 Verification URL:', registerData.verificationUrl);
    }
  } catch (error) {
    console.log('❌ Registration failed:', error.message);
  }
  
  // Test 2: Login with test user
  console.log('\n2. Testing login with test user...');
  try {
    const loginResponse = await fetch(`${baseURL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('✅ Login:', loginResponse.status, loginData.message);
    
    if (loginData.token) {
      console.log('🔑 Token received:', loginData.token.substring(0, 20) + '...');
    }
  } catch (error) {
    console.log('❌ Login failed:', error.message);
  }
  
  // Test 3: Get chat rooms
  console.log('\n3. Testing chat rooms endpoint...');
  try {
    const roomsResponse = await fetch(`${baseURL}/api/rooms`);
    const roomsData = await roomsResponse.json();
    console.log('✅ Chat rooms:', roomsResponse.status, `${roomsData.rooms?.length || 0} rooms found`);
  } catch (error) {
    console.log('❌ Chat rooms failed:', error.message);
  }
  
  console.log('\n🎉 API tests completed!');
};

// Run if this file is executed directly
if (require.main === module) {
  testAPI().catch(console.error);
}

module.exports = testAPI;