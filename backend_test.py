import requests
import sys
from datetime import datetime
import json

class FreelanceHubAPITester:
    def __init__(self, base_url="https://pagerestore.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"Response Status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response Data: {json.dumps(response_data, indent=2)}")
                    return True, response_data
                except:
                    print("Response: Non-JSON response")
                    return True, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"Error Response: {json.dumps(error_data, indent=2)}")
                except:
                    print(f"Error Response: {response.text}")
                return False, {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            return False, {}
        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection error")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test(
            "Root Endpoint",
            "GET",
            "",
            200
        )

    def test_create_status_check(self):
        """Test creating a status check"""
        test_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        return self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data=test_data
        )

    def test_get_status_checks(self):
        """Test getting all status checks"""
        return self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )

def main():
    print("🚀 Starting FreelanceHub Backend API Tests")
    print("=" * 50)
    
    # Setup
    tester = FreelanceHubAPITester()

    # Test 1: Root endpoint
    success, _ = tester.test_root_endpoint()
    if not success:
        print("❌ Root endpoint failed - backend may not be running")

    # Test 2: Create status check
    success, response_data = tester.test_create_status_check()
    if success:
        print("✅ Status check creation working")
    else:
        print("❌ Status check creation failed")

    # Test 3: Get status checks
    success, _ = tester.test_get_status_checks()
    if success:
        print("✅ Status check retrieval working")
    else:
        print("❌ Status check retrieval failed")

    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Backend Tests Summary:")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All backend tests passed!")
        return 0
    else:
        print("⚠️  Some backend tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())